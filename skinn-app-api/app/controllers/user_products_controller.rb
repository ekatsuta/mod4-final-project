class UserProductsController < ApplicationController

  def index
    user_products = UserProduct.all
    render json: user_products
  end

  def add_products
    userCollection = params["userCollection"]
    currentUserId = params["currentUser"]["id"]
    newCollection = UserProduct.createUserProduct(userCollection, currentUserId)
    byebug
    render json: newCollection
  end

  private
  def user_product_params
    params.require(:user_product).permit(:user_id, :product_id)
  end

end
