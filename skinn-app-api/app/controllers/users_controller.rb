class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(
      username: params[:username],
      password: params[:password],
      name: params[:name],
      user_skintype: params[:profile_img])

    if user.save
      render json: user
    else
      render json: {errors: user.errors.full_messages}
    end

  end


  def editimage
    user = User.find(params[:user_id])
    user.update(name: params[:name], profile_img: params[:profile_img])
    render json: user
  end 

  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update(user_skintype: params[:user_skintype])
    user.save

    render json: user
  end

  # private
  # def user_params
  #   params.require(:user).permit(:name, :username, :password)
  # end
end
