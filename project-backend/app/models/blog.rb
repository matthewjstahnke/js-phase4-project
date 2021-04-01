class Blog < ApplicationRecord
    belongs_to :author
    has_many :likes
    scope :blog_popular, -> {order("likes_count desc") }


    def author_attributes=(author_name)
        self.author = Author.find_or_create_by(name: author_name)
    end
end
