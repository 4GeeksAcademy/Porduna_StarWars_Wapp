"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Comments


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. 
# The create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Lógica de validación de email y contraseña
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id': user.id,
                                                     'user_is_admin': user.is_admin})
        response_body['message'] = 'User logeado'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = 'Bad username or password'
    return response_body, 401


# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User logueado: {current_user}'
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])  # El POST de users lo haremos en el /signup
def handle_users():
    response_body = {}
    if request.method == 'GET':
        # Aquí tengo que hacer la lógica para mostrar los usuarios que tengo en mi DB.
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # Utilizo List Comprehension
        response_body['results'] = results
        response_body['message'] = 'Listado de Usuarios'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Este endpoint no es válido. Ud debe hacer un /signup'
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
        return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])  # El POST de users lo haremos en el /signup
@jwt_required()
def handle_posts():
        return response_body, 200


@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(post_id):
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = 'Método GET de /posts/<int:post_id>'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'PUT':
        # data = request.json
        # TODO: Validación de datos recibidos
        # print(data)
        response_body['message'] = 'Método PUT de /posts/<int:post_id>'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = 'Método DELETE de /posts/<int:post_id>'
        response_body['results'] = {}
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    response_body = {}
    if request.method == 'GET':
        response_body['results'] = []
        response_body['message'] = 'Metodo GET de /comments'
        return response_body, 200
    if request.method == 'POST':
        # data = request.json
        # TODO: Validación de datos recibidos
        response_body['results'] = {}
        response_body['message'] = 'Médodo Post de /comments'
        return response_body, 200


@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment(comment_id):
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = 'Método GET de /comments/<int:comment_id>'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'PUT':
        # data = request.json
        # TODO: Validación de datos recibidos
        # print(data)
        response_body['message'] = 'Método PUT de /comments/<int:comment_id>'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = 'Método DELETE de /comments/<int:comment_id>'
        response_body['results'] = {}
        return response_body, 200
        