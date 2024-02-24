import time
from flask import Flask, request, jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import os
import aws.list_resources as list_resources
import base64
 
 
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
def connected():
    """event listener when client connects to the server"""
    time.sleep(10)
    emit("result",{"message":"Response after 10 secods"})
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')