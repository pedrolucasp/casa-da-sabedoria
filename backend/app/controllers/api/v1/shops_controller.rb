class Api::V1::ShopsController < ApplicationController
  def index
    @shops = Shop.all.order(:name)

    render json: {
      shops: @shops.map { |s| ::ShopSerializer.new(s, view: :summary).as_json }
    }
  end

  def show
    @shop = Shop.find(params[:id])

    render json: ::ShopSerializer.new(@shop, view: :detailed, root: :shop)
  end
end
