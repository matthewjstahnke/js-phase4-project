class AddLikesToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :likes, :integer
  end
end
