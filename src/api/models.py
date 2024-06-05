from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        # Do not serialize the password, it's a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)
    body = db.Column(db.String(), nullable=False)
    leyend = db.Column(db.String(), nullable=False)
    publication_date = db.Column(db.Date)
    image_url = db.Column(db.String(), nullable=False)
    # Se define el ForeignKey
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Se establece y define la relación con la otra tabla
    author_to = db.relationship('Users', foreign_keys=[author_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'leyend': self.leyend,
                'publication_date': self.publication_date,
                'image_url': self.image_url,
                'author_id': self.author_id}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])
    body = db.Column(db.String(), nullable=False)
    date = db.Column(db.Date)

    def __repr__(self):
        return f'<Comments: {self.post_id}>'

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'post_id': self.post_id,
                'body': self.body,
                'date': self.date}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=True)
    rotation_period = db.Column(db.Float, nullable=True)
    orbital_period = db.Column(db.Float, nullable=True)
    diameter = db.Column(db.Float, nullable=True)
    climate = db.Column(db.String(), unique=False, nullable=True)
    gravity = db.Column(db.String(), unique=False, nullable=True)
    terrain = db.Column(db.String(), unique=False, nullable=True)
    surface_water = db.Column(db.Integer, nullable=True)
    population = db.Column(db.Integer, nullable=True)
    residents = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('characters.id'))  # Más adelante modificar para interconectarlo con Characters
    # to_residents = db.relationship('Characters', foreign_keys=[residents])
    films = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('films.id'))  # Más adelante modificar para interconectarlo con Films
    to_films = db.Column(db.String(), unique=False, nullable=True)  #  db.relationship('Films', foreign_keys=[films])

    def __repr__(self):
        return f'<Planets: {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'rotation_period': self.rotation_period,
                'orbital_period': self.orbital_period,
                'diameter': self.diameter,
                'climate': self.climate,
                'gravity': self.gravity,
                'terrain': self.terrain,
                'surface_water': self.surface_water,
                'population': self.population,
                'residents': self.residents,
                'films': self.films}


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=True)
    height = db.Column(db.Float, nullable=True)
    mass = db.Column(db.Float, nullable=True)
    hair_color = db.Column(db.String(), unique=False, nullable=True)
    skin_color = db.Column(db.String(), unique=False, nullable=True)
    eye_color = db.Column(db.String(), unique=False, nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)
    gender = db.Column(db.String(), unique=False, nullable=True)
    home_world = db.Column(db.Integer, db.ForeignKey('planets.id'))  # Más adelante modificar para interconectarlo con Planets
    to_home_world = db.relationship('Planets', foreign_keys=[home_world])
    films = db.Column(db.Integer, db.ForeignKey('films.id'))  # Más adelante modificar para interconectarlo con Films
    to_films = db.relationship('Films', foreign_keys=[films])
    vehicles = db.Column(db.Integer, db.ForeignKey('vehicles.id'))  # Más adelante modificar para interconectarlo con Vehicles
    to_vehicles = db.relationship('Vehicles', foreign_keys=[vehicles])
    species = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<Characters: {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'height': self.height,
                'mass': self.mass,
                'hair_color': self.hair_color,
                'skin_color': self.skin_color,
                'eye_color': self.eye_color,
                'date_of_birth': self.date_of_birth,
                'home_world': self.home_world,
                'films': self.films,
                'vehicles': self.vehicles,
                'species': self.species}


class Films(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), unique=True, nullable=False)
    opening_crawl = db.Column(db.String(), unique=True, nullable=False)
    director = db.Column(db.String(), unique=False, nullable=False)
    producer = db.Column(db.String(), unique=False, nullable=False)
    release_date = db.Column(db.Date, unique=True)
    characters_id = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('characters.id'))  # Más adelante modificar para interconectarlo con Characters
    to_characters = db.Column(db.String(), unique=False, nullable=True)  #  db.relationship('Characters', foreign_keys=[characters])
    planets = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('planets.id'))  # Más adelante modificar para interconectarlo con Planets
    to_planets = db.Column(db.String(), unique=False, nullable=True)  #  db.relationship('Planets', foreign_keys=[planets])
    vehicles = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('vehicles.id'))  # Más adelante modificar para interconectarlo con Vehicles
    to_vehicles = db.Column(db.String(), unique=False, nullable=True)  #  db.relationship('Vehicles', foreign_keys=[vehicles])
    species = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<Films: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'opening_crawl': self.opening_crawl,
                'director': self.director,
                'producer': self.producer,
                'release_date': self.release_date,
                'characters_id': self.characters_id,
                'planets': self.planets,
                'vehicles': self.vehicles,
                'species': self.species}


class Vehicles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=False, nullable=True)
    model = db.Column(db.String(), unique=False, nullable=True)
    manufacturer = db.Column(db.String(), unique=False, nullable=True)
    cost_in_credits = db.Column(db.Float, nullable=True)
    length = db.Column(db.Float, nullable=True)
    max_atmosphering_speed = db.Column(db.Float, nullable=True)
    crew = db.Column(db.String(), unique=False, nullable=True)
    passengers = db.Column(db.Float, nullable=True)
    cargo_capacity = db.Column(db.Float, nullable=True)
    consumables = db.Column(db.String(), unique=False, nullable=True)
    vehicle_class = db.Column(db.String(), unique=False, nullable=True)
    pilots = db.Column(db.String(), unique=False, nullable=True)
    films = db.Column(db.String(), unique=False, nullable=True)  #  db.Column(db.Integer, db.ForeignKey('films.id'))  # Más adelante modificar para interconectarlo con Films
    to_films = db.Column(db.String(), unique=False, nullable=True)  #  db.relationship('Films', foreign_keys=[films])

    def __repr__(self):
        return f'<Vehicles: {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'model': self.model,
                'manufacturer': self.manufacturer,
                'cost_in_credits': self.cost_in_credits,
                'length': self.length,
                'max_atmosphering_speed': self.max_atmosphering_speed,
                'crew': self.crew,
                'passengers': self.passengers,
                'cargo_capacity': self.cargo_capacity,
                'consumables': self.consumables,
                'vehicle_class': self.vehicle_class,
                'pilots': self.pilots,
                'films': self.films}
