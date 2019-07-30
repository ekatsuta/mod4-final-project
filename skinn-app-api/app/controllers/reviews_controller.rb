class ReviewsController < ApplicationController

  def index
    reviews = Review.all
    render json: reviews
  end

  def show
    review = Review.find(params[:id])
  end

  def create
    review = Review.new(review_params)
    review.save
    render json: review

  end

  def update
    review = Review.find(params[:id])
    review.update(review_params)
    review.save
    render json: review
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    render json: review
  end

  private

  def review_params
    params.permit(:notes, :rating, :user_id, :product_id)
  end

end
