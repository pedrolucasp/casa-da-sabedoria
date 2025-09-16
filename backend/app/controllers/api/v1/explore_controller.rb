class Api::V1::ExploreController < ApplicationController
  # TODO: Replace this simulation with real trending logic and featured shops
  def index
    @trending = Book.order(created_at: :desc).limit(24)
    @featured_shops = Shop.order(created_at: :desc).limit(6)

    render json: {
      trending_books: @trending.map { |b| ::BookSerializer.new(b, view: :fully_detailed).as_json },
      featured_shops: @featured_shops.map { |s| ::ShopSerializer.new(s, view: :summary).as_json }
    }
  end
end
