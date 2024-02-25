from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
model = 'gpt-35-turbo-16k'
# model = 'amazon.titan-text-express-v1'

semicolons_gateway_api_key = ""
semicolons_gateway_base_url = ""
def get_response(mesage):
    messages = [HumanMessage(content=mesage)]
    llm = ChatOpenAI(
        model_name = model,
        openai_api_base = semicolons_gateway_base_url,
        openai_api_key = semicolons_gateway_api_key
    )
    # Invoke OpenAI API
    openai_response = llm.invoke(messages)
    return openai_response.content

def genarate_prompt(data, destination_cloud):
    content = None
    try:
        f = open(f"{destination_cloud}-main.tf", "r")
        content = f.read()
        prompt = f"Genarate a terraform script to create virtual machine on {destination_cloud} similar to {data} consider all resources required to make virtual machine publically accessible. Refer below content {content}"
        return prompt
    except Exception as e:
        print(e)
# if __name__=='__main__':
#     # get_response()
#     # genarate_prompt("Hello", "gcp")