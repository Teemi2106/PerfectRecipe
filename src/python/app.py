from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_bot_reply(user_message):
    if "hello" in user_message.lower():
        return "Hello! How can I assist you today?"
    elif "bye" in user_message.lower():
        return "Goodbye! Have a great day!"
    else:
        return "I'm not sure how to respond to that. Can you ask something else?"

@app.route('/chat', methods=['POST'])



def chat():
    try:
        generate_bot_reply("Hello")
        data = request.json
        user_message = data.get("message", "")

        bot_reply = generate_bot_reply(user_message)

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"reply": "There was an error processing your message."}), 500

if __name__ == '__main__':
    app.run(debug=True)
