class ApplicationController < ActionController::Base

  before_action :redirect_www_to_apex, if: -> { Rails.env.production? }
  
  private

  def redirect_www_to_apex
    if request.host.start_with?("www.")
      redirect_to "#{request.protocol}#{request.host.delete_prefix('www.') + request.fullpath}", status: :moved_permanently
    end
  end 


  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern


end
