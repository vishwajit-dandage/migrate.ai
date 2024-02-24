import json
import time
from flask import Flask, request, jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import os
import aws.list_resources as list_resources
import aws.get_recource as get_ec2_details
import terraform.apply as apply_terraform
import genai
import base64
import pickle
 
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")
 
 
# Dummy user authentication function
def authenticate_user(user_id):
    # Implement your authentication logic here
    return True  # Dummy authentication for demonstration purposes
 
@app.route('/fetchresources', methods=['GET'])
def fetch_resources():
    authentication = request.headers.get('Authentication')
    cloud_type = request.args.get('cloud_type')
 
    if not authentication or not cloud_type:
        return jsonify({"error": "Bad request authentication header is missing"}), 400
   
    try:
        authentication = base64.b64decode(authentication).decode('utf-8')
    except Exception:
        return jsonify({"error": "Authentication header not properly encoded"}), 400
    # Authentication
    if not authenticate_user(authentication):
        return jsonify({"error": "Authentication failed"}), 401
 
    if not cloud_type or cloud_type not in ['aws','azure','gcp','onprem']:
        return jsonify({"error": "Invalid cloud type"}), 400
    elif cloud_type == 'aws':
        # Read from ENV
        # os.environ["AWS_ACCESS_KEY_ID"] = os.getenv("AWS_ACCESS_KEY_ID", default=None)
        # os.environ["AWS_SECRET_ACCESS_KEY"] = os.getenv("AWS_SECRET_ACCESS_KEY", default=None)
 
        os.environ["AWS_ACCESS_KEY_ID"] = authentication.split(':')[0]
        os.environ["AWS_SECRET_ACCESS_KEY"] = authentication.split(':')[1]
       
        return ({cloud_type: list_resources.get_resources()})
   
    elif cloud_type == 'azure':
        print('azure')
    elif cloud_type == 'gcp':
        print('gcp')
    else:
        print('on-premises')
    return jsonify({cloud_type: None})
 
@app.route('/migrateresources', methods=['POST'])
def migrate_resources():
    user_id = request.headers.get('userid')
    # Authentication
    if not authenticate_user(user_id):
        return jsonify({"error": "Authentication failed"}), 401
    # Migration logic (if any)
    return jsonify({"message": "Migration completed"}), 200
 
@socketio.on("migrate")
def connected(data, source_cloud, destination_cloud, destination_cloud_creds):
    # print(destination_cloud_creds)
    try:
        if not source_cloud or not destination_cloud or not destination_cloud_creds or not data:
            emit("result",{"message":f"Input Missing"})
            return jsonify({"error": "Input Missing"}), 400
        try:
            file = open('terraform/creds.json', 'w')
            file.write(json.dumps(destination_cloud_creds))
            file.close()
        except Exception as e:
            print(e)
        # print(data)
        if not source_cloud or source_cloud not in ['aws','azure','gcp']:
            return jsonify({"error": "Invalid source cloud type"}), 400
        elif source_cloud == 'aws':
            try:
                    instance = {}
                    try:
                        for ec2 in data['aws']['us-east-1']['ec2']:
                            instance, sg = get_ec2_details.get_ec2_details(ec2)
                            instance.update(sg)
                    except Exception as e:
                        print(f"Error parsing JSON: {e}")
                    # print(instance)
                    prompt = genai.genarate_prompt(instance,destination_cloud)
                    # print(prompt)
                    response = genai.get_response(prompt)
                    # print(response)
                    try:
                        file = open('terraform/main.tf', 'w')
                        file.write(response)
                        file.close()
                    except Exception as e:
                        print(e)
                    if apply_terraform.apply_terraform('terraform/main.tf'):
                        emit("result",{"message":f"{data} Migrated Successfully"})
                    emit("result",{"message":f"Error in Migration"})
            except Exception as e: 
                print(e)
                emit("result",{"message":f"Error in Migration"})
        elif source_cloud == 'azure':
            print('azure')
        elif source_cloud == 'gcp':
            print('gcp')
        else:
            print('on-premises')
            prompt = genai.genarate_prompt(instance,destination_cloud)
                    # print(prompt)
            response = genai.get_response(prompt)
            # emit("result",{"message":f"{response}"})
        # emit("result",{"message":f"{data} Migrated Successfully"})
    except Exception:
        print("Error in migration")

@socketio.on("disconnect")
def disconnect():
    emit("disconnect",f"Websocket disconnected",broadcast=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')