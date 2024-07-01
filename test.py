import cohere

# Replace with your actual Cohere API key
API_KEY = "ZxilJIW1sFy1RSUcGBt1S36oGlM3mKJjloU9XupU"

# Initialize Cohere client
co = cohere.Client(API_KEY)

try:
    # Make a simple API call to check if the API key is valid
    response = co.generate(
        model='command-xlarge-2022',
        prompt='Hello, Cohere!',
        max_tokens=5
    )
    print("API Key is valid. Response from Cohere:", response.generations[0].text)
except cohere.CohereError as e:
    print(f"API Key test failed. Error: {e}")