class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(
      username: params[:username],
      password: params[:password],
      name: params[:name])

    if user.save
      render json: user
    else
      render json: {errors: user.errors.full_messages}
    end

  end

  # private
  # def user_params
  #   params.require(:user).permit(:name, :username, :password)
  # end
end
