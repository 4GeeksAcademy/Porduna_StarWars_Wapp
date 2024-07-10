"""empty message

Revision ID: bbd1007b3bfe
Revises: 42a22aa39091
Create Date: 2024-07-10 10:30:48.119157

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'bbd1007b3bfe'
down_revision = '42a22aa39091'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('starships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('starship_class', sa.String(), nullable=True),
    sa.Column('hyperdrive_rating', sa.String(), nullable=True),
    sa.Column('model', sa.String(), nullable=True),
    sa.Column('crew', sa.String(), nullable=True),
    sa.Column('manufacturer', sa.String(), nullable=True),
    sa.Column('cost_in_credits', sa.String(), nullable=True),
    sa.Column('cargo_capacity', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorite_characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('favorited_by_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['favorited_by_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('followers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('followed_by_id', sa.Integer(), nullable=True),
    sa.Column('you_follow_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_by_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['you_follow_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('films')
    op.drop_table('vehicles')
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('home_world_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('characters_name_key', type_='unique')
        batch_op.drop_constraint('characters_films_fkey', type_='foreignkey')
        batch_op.drop_constraint('characters_vehicles_fkey', type_='foreignkey')
        batch_op.drop_constraint('characters_home_world_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'planets', ['home_world_id'], ['id'])
        batch_op.drop_column('mass')
        batch_op.drop_column('height')
        batch_op.drop_column('vehicles')
        batch_op.drop_column('date_of_birth')
        batch_op.drop_column('skin_color')
        batch_op.drop_column('home_world')
        batch_op.drop_column('hair_color')
        batch_op.drop_column('species')
        batch_op.drop_column('eye_color')
        batch_op.drop_column('gender')
        batch_op.drop_column('films')

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_publication', sa.Date(), nullable=True))
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('date')

    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.alter_column('diameter',
               existing_type=postgresql.DOUBLE_PRECISION(precision=53),
               type_=sa.String(),
               existing_nullable=True)
        batch_op.alter_column('rotation_period',
               existing_type=postgresql.DOUBLE_PRECISION(precision=53),
               type_=sa.String(),
               existing_nullable=True)
        batch_op.drop_constraint('planets_name_key', type_='unique')
        batch_op.drop_column('surface_water')
        batch_op.drop_column('to_films')
        batch_op.drop_column('residents')
        batch_op.drop_column('population')
        batch_op.drop_column('orbital_period')
        batch_op.drop_column('films')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_publication', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_constraint('posts_author_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'users', ['user_id'], ['id'])
        batch_op.drop_column('leyend')
        batch_op.drop_column('author_id')
        batch_op.drop_column('publication_date')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('is_admin')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('publication_date', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('author_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('leyend', sa.VARCHAR(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('posts_author_id_fkey', 'users', ['author_id'], ['id'])
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.drop_column('user_id')
        batch_op.drop_column('date_publication')

    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('films', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('orbital_period', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('population', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('residents', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('to_films', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('surface_water', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.create_unique_constraint('planets_name_key', ['name'])
        batch_op.alter_column('rotation_period',
               existing_type=sa.String(),
               type_=postgresql.DOUBLE_PRECISION(precision=53),
               existing_nullable=True)
        batch_op.alter_column('diameter',
               existing_type=sa.String(),
               type_=postgresql.DOUBLE_PRECISION(precision=53),
               existing_nullable=True)

    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.alter_column('body',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.drop_column('date_publication')

    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('films', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('gender', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('eye_color', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('species', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('hair_color', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('home_world', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('skin_color', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('date_of_birth', sa.DATE(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('vehicles', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('height', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('mass', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('characters_home_world_fkey', 'planets', ['home_world'], ['id'])
        batch_op.create_foreign_key('characters_vehicles_fkey', 'vehicles', ['vehicles'], ['id'])
        batch_op.create_foreign_key('characters_films_fkey', 'films', ['films'], ['id'])
        batch_op.create_unique_constraint('characters_name_key', ['name'])
        batch_op.drop_column('home_world_id')
        batch_op.drop_column('description')

    op.create_table('vehicles',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('model', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('manufacturer', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('cost_in_credits', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('length', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('max_atmosphering_speed', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('crew', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('passengers', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('cargo_capacity', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('consumables', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('vehicle_class', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('pilots', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('films', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('to_films', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='vehicles_pkey')
    )
    op.create_table('films',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('opening_crawl', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('director', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('producer', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('release_date', sa.DATE(), autoincrement=False, nullable=True),
    sa.Column('characters_id', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('to_characters', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('planets', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('to_planets', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('vehicles', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('to_vehicles', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('species', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='films_pkey'),
    sa.UniqueConstraint('opening_crawl', name='films_opening_crawl_key'),
    sa.UniqueConstraint('release_date', name='films_release_date_key'),
    sa.UniqueConstraint('title', name='films_title_key')
    )
    op.drop_table('followers')
    op.drop_table('favorite_characters')
    op.drop_table('starships')
    # ### end Alembic commands ###
