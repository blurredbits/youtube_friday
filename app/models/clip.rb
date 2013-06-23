class Clip < ActiveRecord::Base
  has_many :ratings
  validates :url, :uniqueness => true
end
