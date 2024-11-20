class ApplicationController < ActionController::Base
  before_action :check_username
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def guest_user(with_retry = true)
    # Cache the value the first time it's gotten.
    @cached_guest_user ||= User.find(session[:guest_user_id])

  rescue ActiveRecord::RecordNotFound # if session[:guest_user_id] invalid
    puts "not found!"
    puts session[:guest_user_id]
    session[:guest_user_id] = nil
    # guest_user if with_retry
  end

  private
  def check_username
    if !session[:guest_user_id]
      redirect_to controller: "users"
    end
  end
end
