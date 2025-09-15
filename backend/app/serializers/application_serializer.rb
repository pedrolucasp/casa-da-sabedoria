# frozen_string_literal: true

# XXX: Shamefully stolen from, uh, somewhere. *cof cof*
class ApplicationSerializer
  attr_reader :object, :options

  def self.attributes(*args)
    @_attributes ||= args
  end

  def self.root(key = nil)
    @_root_key = key || @_root_key
  end

  def initialize(object, options = {})
    @object = object
    @options = options
    @root = options.fetch(:root) { self.class.root || false }
    @is_collection_serializer = options.fetch(:each_serializer, false)
  end

  def to_json(_ = nil)
    serializable_hash.to_json
  end

  # This is called by Rails' render if you pass a has to render json
  def as_json(_ = nil)
    serializable_hash
  end

  private

  def attributes
    self.class.attributes.each_with_object({}) do |attr, hash|
      hash[attr] = public_send(attr)
    end
  end

  def serializable_hash
    attr_hash = attributes

    # Avoid double wrapping when serializing a collection with a root.
    if @root && @is_collection_serializer
      attr_hash
    elsif @root
      { @root => attr_hash }
    else
      attr_hash
    end
  end
end
