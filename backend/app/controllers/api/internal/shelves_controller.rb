class Api::Internal::ShelvesController < ApplicationController
  before_action :set_shop, only: [:create, :mine]

  def create
    @shelf = @shop.shelves.build(shelf_params)

    if @shelf.save
      render json: { shelf: @shelf }, status: :created
    else
      # TODO: Move this into a reusable method
      render json: { errors: @shelf.errors.full_messages }, status: :unprocessable_content
    end
  end

  def mine
    @shelves = @shop.shelves.order(:name)

    render json: { shelves: @shelves }
  end

  private

  def set_shop
    @shop = current_user.shops.sole
  end

  def shelf_params
    params.require(:shelf).permit(:name)
  end
end
