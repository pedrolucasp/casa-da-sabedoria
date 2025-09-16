class Api::V1::ShelvesController < ApplicationController
  def index
    @shelves = Shelf.all.order(:name)

    render json: {
      shelves: @shelves.map {
        ShelfSerializer.new(it, view: :with_books)
      }
    }
  end

  def curated
    # Simulate curated shelves by picking 5 random shelves with any books on it
    # TODO: Add a 'curated' boolean column to shelves table and use that instead
    @shelves = Shelf
      .joins(:books)
      .group("shelves.id")
      .having("COUNT(books.id) >= 6")
      .order("RANDOM()")
      .limit(3)

    render json: {
      shelves: @shelves.map {
        ShelfSerializer.new(it, view: :detailed_with_shop)
      }
    }
  end
end
