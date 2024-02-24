import os
import subprocess

def apply_terraform(file_path):
    try:
        print(file_path)
        # Run terraform apply command
        os.chdir('terraform')
        subprocess.run(['terraform', 'init'], check=True)
        subprocess.run(['terraform', 'apply', '-auto-approve'], check=True)
        return 1
    except subprocess.CalledProcessError as e:
        return 0
    finally:
        os.remove('creds.json')
        os.remove('main.tf')


# if __name__ == "__main__":
#     terraform_file_path = "path/to/your/terraform/file.tf"
    
#     # Apply the Terraform configuration
#     apply_terraform(terraform_file_path)
