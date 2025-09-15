# frozen_string_literal: true

# XXX: Shamefully stolen from, uh, somewhere. *cof cof*
#
# Also added option to have different views, because fuck adding multiple
# different serializers for each type of screen

class ApplicationSerializer
  attr_reader :object, :options

  class << self
    def attributes(*args)
      @_default_attributes ||= []
      @_default_attributes += args
    end

    def association(name, serializer:, many: false, view: nil)
      @_associations ||= {}
      @_associations[name.to_sym] = { serializer: serializer, many: many, view: view }
    end

    def associations
      @_associations || {}
    end

    def view(name, &block)
      @_views ||= {}
      @_views[name.to_sym] = View.new.tap(&block)
    end

    def default_attributes
      @_default_attributes || []
    end

    def views
      @_views || {}
    end
  end

  class View
    attr_reader :attributes, :associations

    def initialize
      @attributes = []
      @associations = {}
    end

    def attributes(*args)
      @attributes.concat(args)
    end

    # XXX: Required since we have a associations method
    def fetch_associations
      @associations
    end

    # for simple inclusion with no overrides
    def associations(*names)
      names.each do |n|
        @associations[n.to_sym] ||= {}
      end
    end

    # for per-association config
    def association(name, view: nil)
      @associations[name.to_sym] = { view: view }
    end
  end

  def initialize(object, options = {})
    @object = object
    @options = options
    @root = options.fetch(:root) { self.class.instance_variable_get(:@_root_key) || false }
    @is_collection_serializer = options.fetch(:each_serializer, false)
  end

  def to_json(_ = nil)
    serializable_hash.to_json
  end

  def as_json(_ = nil)
    serializable_hash
  end

  private

  def attributes
    hash = {}

    active_attributes.each do |attr|
      hash[attr] = public_send(attr)
    end

    active_associations.each do |name, cfg|
      value = object.public_send(name)

      if cfg[:many]
        hash[name] = Array(value).map { |item| serialize_association(cfg, item) }
      else
        hash[name] = value && serialize_association(cfg, value)
      end
    end

    hash
  end

  def serializable_hash
    attr_hash = attributes

    if @root && @is_collection_serializer
      attr_hash
    elsif @root
      { @root => attr_hash }
    else
      attr_hash
    end
  end

  def serialize_association(cfg, value)
    assoc_view = cfg[:override_view] || cfg[:view]
    cfg[:serializer].new(value, view: assoc_view).as_json
  end

  def active_attributes
    if (view_name = options[:view]&.to_sym) && self.class.views[view_name]
      self.class.views[view_name].attributes
    else
      self.class.default_attributes
    end
  end

  def active_associations
    base = self.class.associations.dup

    if (view_name = options[:view]&.to_sym) && self.class.views[view_name]
      overrides = self.class.views[view_name].fetch_associations

      overrides.each do |name, ov|
        if base[name]
          # merge override view into base association config
          base[name] = base[name].merge(override_view: ov[:view])
        else
          # allow view to include an association that wasn’t declared? optional
          base[name] = { view: ov[:view] }
        end
      end
    end

    base
  end
end
