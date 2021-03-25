class AddLikeCountToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :like_count, :integer
  end
end
