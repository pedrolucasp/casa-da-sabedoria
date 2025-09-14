class Api::Internal::ShopsController < ApplicationController
  def mine
    @shop = current_user.shops.includes(books: :shelves).sole

    render json: {
      shop: @shop.as_json.merge(
        shelves: @shop.shelves.as_json
      )
    }

  rescue ActiveRecord::RecordNotFound
    render json: { shop: nil }, status: :not_found
  end

  def create
    @shop = current_user.shops.build(shop_params)

    if @shop.save
      render json: { shop: @shop }, status: :created
    else
      render json: { errors: @shop.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def shop_params
    params.require(:shop).permit(:name, :bio, :location)
  end
end
