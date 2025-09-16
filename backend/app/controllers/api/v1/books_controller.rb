class Api::V1::BooksController < ApplicationController
  def index
    books = Book.all

    if params[:q].present?
      q = "%#{params[:q]}%"
      books = books.joins(:authors, :genres).where(
        "books.title ILIKE :q OR authors.name ILIKE :q OR genres.name ILIKE :q",
        q: q
      ).distinct
    end

    @books = books.order(created_at: :desc).limit(24)

    render json: { books: @books
      .map { ::BookSerializer.new(it, view: :fully_detailed) }
    }
  end

  def show
    @book = Book
      .includes(:genres, :authors)
      .find_by(id: params[:id])

    if @book
      render json: ::BookSerializer.new(@book, view: :show, root: :book)
    else
      render json: { error: "Book not found" }, status: :not_found
    end
  end
end
