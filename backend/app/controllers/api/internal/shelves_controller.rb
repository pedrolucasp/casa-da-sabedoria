class Api::Internal::ShelvesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_shelf, only: [:show, :update, :destroy]
  before_action :set_shop, only: [:create, :mine, :index]

  def index
    @shelves = @shop.shelves.order(:name)

    render json: { shelves: @shelves
      .map { ::ShelfSerializer.new(it, view: :detailed) } }
  end

  def create
    @shelf = @shop.shelves.build(shelf_params)

    if @shelf.save
      render json: { shelf: @shelf }, status: :created
    else
      # TODO: Move this into a reusable method
      render json: { errors: @shelf.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update
    if @shelf.update(shelf_params)
      render json: @shelf, status: :ok
    else
      render json: { errors: @shelf.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: ::ShelfSerializer.new(@shelf, view: :detailed_with_books)
  end

  def destroy
    if @shelf.destroy
      head :no_content
    else
      render json: { errors: @shelf.errors.full_messages }
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

  def set_shelf
    @shelf = current_user.shelves.find(params[:id])
  end

  def shelf_params
    params.require(:shelf).permit(:name)
  end
end
