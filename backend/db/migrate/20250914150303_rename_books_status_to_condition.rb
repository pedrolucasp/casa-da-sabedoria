class RenameBooksStatusToCondition < ActiveRecord::Migration[8.0]
  def change
    rename_column :books, :status, :condition
  end
end
