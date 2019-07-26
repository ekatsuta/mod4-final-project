class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def login
    user = User.find_by(name: request.headers["Authorization"])
    userProducts = user.products

    render json: {user: user, userProducts: userProducts}
  end
end
