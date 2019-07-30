class AuthController < ApplicationController

  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      render json: user
    else
      render json: {errors: "Wrong username or password"}
    end
  end

  def auto_login
    user = User.find(request.headers["Authorization"])
    userCollection = user.products

    if user
      render json: {user: user, userCollection: userCollection}
    else
      render json: {errors: "User does not exist"}
    end

  end

end
