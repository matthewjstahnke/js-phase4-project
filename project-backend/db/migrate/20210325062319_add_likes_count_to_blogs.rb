class AddLikesCountToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :likes_count, :integer, :default => 0
  end
end
