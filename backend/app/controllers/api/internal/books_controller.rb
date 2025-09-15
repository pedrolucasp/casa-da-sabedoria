class Api::Internal::BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: [:edit, :update, :destroy]

  def index
    @books = Book.includes(:authors, :publisher, :genres).all

    render json: { books: ::BookSerializer.new(@books, view: :detailed) }, status: :ok
  end

  def create
    service = Books::Create.new(params: book_params, user: current_user)

    if service.call
      render json: service.book.as_json(
        include: [:authors, :publisher, :genres]
      ), status: :created
    else
      render json: { errors: service.errors.full_messages },
        status: :unprocessable_content
    end
  end

  def edit
    render json: ::BookSerializer.new(@book, view: :edit, root: :book), status: :ok
  end

  def update
    service = Books::Update.new(@book, book_params)
    result = service.call

    if result.errors.empty?
      render json: BookSerializer.new(result, view: :summary), status: :ok
    else
      render json: { errors: result.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @book.destroy
      head :no_content
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Book not found" }, status: :not_found
  end

  def book_params
    params.require(:book)
      .permit(
        :title,
        :description,
        :year,
        :publisher_id,
        :cover,
        photos: [],
        shelf_ids: [],
        genre_ids: [],
        author_ids: []
      )
  end
end
