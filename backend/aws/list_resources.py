import boto3
from botocore.exceptions import ClientError

def get_resources():
    resources_data = {}
    # Create an EC2 client
    ec2_client = boto3.client('ec2', region_name='us-east-1')
    regions = [region['RegionName'] for region in ec2_client.describe_regions()['Regions']]
    # Iterate through each region
    for region in regions:
        resources_dict = {}
        ec2_list = []
        lambda_list = []
        api_gateways_list = []
        # List EC2 instances
        ec2_client = boto3.client('ec2', region_name = region)
        ec2_instances = ec2_client.describe_instances()
        for reservation in ec2_instances['Reservations']:
            for instance in reservation['Instances']:
                # print(f"EC2 Instance: {instance['InstanceId']}")
                ec2_list.append({"InstanceId" : f"{instance['InstanceId']}"})
        
        # List Lambda functions
        lambda_client = boto3.client('lambda', region_name = region)
        lambda_functions = lambda_client.list_functions()
        for function in lambda_functions['Functions']:
            # print(f"Lambda Function: {function['FunctionName']}")
            lambda_list.append({"Name" : f"{function['FunctionName']}"})

        # List API Gateways
        apigateway_client = boto3.client('apigateway',region_name = region)
        api_gateways = apigateway_client.get_rest_apis()

        for api_gateway in api_gateways['items']:
            api_gateways_list.append({"Name" : f"{api_gateway['name']}"})
        
        if ec2_list:
            resources_dict['ec2'] = ec2_list
        if lambda_list:
            # print(lambda_list)
            resources_dict['lambda'] = lambda_list
        if api_gateways_list:
            # print(api_gateways_list)
            resources_dict['apigateway'] = api_gateways_list

        if resources_dict:
            resources_data[region] = resources_dict

    return resources_data


def get_instance_sg():
    ec2_client = boto3.client('ec2', region_name='us-east-1')
    response = ec2_client.describe_instances()
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            if 'i-08c3475d69dd0c397' == instance['InstanceId']:
                print("InstanceId %s" %instance['InstanceId'])
                print("Instance Details \n %s" %instance)
                print("SG Id %s" %instance['SecurityGroups'][0]['GroupId'])
                response = ec2_client.describe_security_groups(GroupIds=[
                            instance['SecurityGroups'][0]['GroupId'],
                            ])
                print(response)
