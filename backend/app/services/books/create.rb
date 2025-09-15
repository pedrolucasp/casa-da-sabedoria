module Books
  class Create
    include ActiveModel::Model

    attr_reader :params, :user, :book

    validates :title, presence: true
    validates :year, presence: true
    validates :publisher_id, presence: true
    validates :author_ids, presence: true
    validates :shelf_ids, presence: true
    validates :genre_ids, presence: true

    def initialize(params:, user:)
      @params = params
      @user   = user
    end

    def call
      return false unless valid?

      ActiveRecord::Base.transaction do
        publisher = Publisher.find(publisher_id)
        authors   = Author.where(id: author_ids)
        genres    = Genre.where(id: genre_ids) if genre_ids.present?
        shelves   = Shelf.where(id: shelf_ids) if shelf_ids.present?

        @book = Book.new(
          title:       params[:title],
          description: params[:description],
          year:        params[:year],
          publisher:   publisher,
          cover:       params[:cover],
          photos:      params[:photos]
        )

        @book.authors = authors
        @book.genres  = genres  if genres.present?
        @book.shelves = shelves if shelves.present?

        @book.save!
      end

      @book
    rescue ActiveRecord::RecordNotFound => e
      errors.add(:base, e.message)
      false
    rescue ActiveRecord::RecordInvalid => e
      errors.add(:base, e.message)
      false
    end

    private

    def title        = params[:title]
    def year         = params[:year]
    def publisher_id = params[:publisher_id]
    def author_ids   = params[:author_ids]
    def genre_ids    = params[:genre_ids]
    def shelf_ids    = params[:shelf_ids]
  end
end
