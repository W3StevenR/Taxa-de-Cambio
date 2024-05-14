from flask import Flask, redirect, render_template, jsonify, request, url_for
import requests
import json
app = Flask(__name__)


@app.route('/')
def index():
  return render_template('index.html')


@app.route('/post_data', methods=['POST'])
def post_data():

  moeda1 = request.form['moeda1']
  moeda2 = request.form['moeda2']

  # Construir a URL da requisição com base nos valores das moedas
  url = f'https://economia.awesomeapi.com.br/last/{moeda1}-{moeda2}'

  dados = {
    "moeda1": moeda1,
    "moeda2": moeda2,
    "url": url
  }

  # Salvando o dicionário em um arquivo JSON
  with open("temp/dados.json", "w") as arquivo_json:
    json.dump(dados, arquivo_json)
  return '', 200

@app.route('/get_data')
def get_data():
  # Abrindo o arquivo JSON em modo de leitura
  with open("temp/dados.json", "r") as arquivo_json:
    # Carregando o conteúdo do arquivo JSON em um dicionário Python
    dados = json.load(arquivo_json)

 # Faz uma requisição para a API
  response = requests.get(dados["url"])
  data = response.json()
  sigla_conc = dados['moeda1']+dados['moeda2']
  #print(nome)
  return jsonify(data[sigla_conc])



if __name__ == '__main__':
  app.run(debug=True)
