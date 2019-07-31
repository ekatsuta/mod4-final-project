class UserProductsController < ApplicationController

  def index
    user_products = UserProduct.all
    render json: user_products
  end

  def add_products

    userCollection = params["userCollection"]
    currentUserId = params["currentUser"]["id"]
    newCollection = UserProduct.createUserProduct(userCollection, currentUserId)
    # byebug
    render json: newCollection
  end

  def swap
    # find user_product instance
    # update the product_id and return
    user_id = params["user_id"]
    # newproduct
    product_id = params["product_id"]
    category_id = params["category_id"]

    foundUserProduct = UserProduct.find_user_product(user_id, category_id)

    foundUserProduct.update(product_id: product_id)
    render json: foundUserProduct
  end

  private
  def user_product_params
    params.require(:user_product).permit(:user_id, :product_id)
  end

end
