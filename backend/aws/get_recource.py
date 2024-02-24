import boto3
def get_ec2_details(instance_id):
    ec2_client = boto3.client('ec2', region_name = 'us-east-1')
    response = ec2_client.describe_instances()
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            if instance_id == instance['InstanceId']:
                # print ("InstanceId %s" %instance['InstanceId'])
                # print ("Instance Details \n %s" %instance)
                response = ec2_client.describe_security_groups(GroupIds=[
                            instance['SecurityGroups'][0]['GroupId'],
                            ])
                return instance, response

if __name__=='__main__':
    get_ec2_details()