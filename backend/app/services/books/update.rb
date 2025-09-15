module Books
  class Update
    attr_reader :params, :book

    def initialize(book, params)
      @book = book
      @params = params
    end

    def call
      ActiveRecord::Base.transaction do
        @book.update!(book_params)

        # TODO: Refactor this to a separate service if it gets more complex
        # Also, can this be more efficient?
        @book.authors = new_authors if new_authors.any?
        @book.genres  = new_genres if new_genres.any?
        @book.shelves = new_shelves if new_shelves.any?
      end

      @book
    rescue ActiveRecord::Rollback => e
      false
    rescue ActiveRecord::RecordInvalid => e
      false
    end

    private

    def new_authors
      Author.where(id: @params[:author_ids])
    end

    def new_genres
      Genre.where(id: @params[:genre_ids])
    end

    def new_shelves
      Shelf.where(id: @params[:shelf_ids])
    end

    def book_params
      @params
        .slice(:title, :description, :year, :condition, :publisher_id, :cover, :photos)
    end
  end
end
