import openai

# Set up the OpenAI API client
openai.api_key = "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"

# Set up the model and prompt
model_engine = "text-davinci-003"
prompt = "Give me a list of Stop words in a list so that i can assign it to a variable in js"

# Generate a response
completion = openai.Completion.create(
    engine=model_engine,
    prompt=prompt,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=1.1,
)

response = completion.choices[0].text
print(response)