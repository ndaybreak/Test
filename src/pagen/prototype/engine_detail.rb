#!/usr/bin/env ruby
require 'erb'
require 'yaml'
require_relative 'engine_util'
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# conf / data classes
# ------------------------------------------------------------------------------
class XDetailItem
  attr_reader :service_name, :return_value, :default_index, :data_source,
              :control_type, :key, :item_name, :item_value, :item_desc,
              :desc_for_message, :html_element_id, :html_element_name,
              :checks, :on_check_fail, :mandatory, :side

  def initialize()
    @internal_id
    @service_name
    @return_value
    @default_index
    @data_source
    @control_type
    @key ##
    @item_name
    @item_value
    @item_desc
    @desc_for_message
    @html_element_id
    @html_element_name
    @checks
    @on_check_fail
    @mandatory
    @side
  end
end

class XDetail
  attr_reader :entity_name, :screen_name, :items
end
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Renderer
# ------------------------------------------------------------------------------
#class Renderer
  xc = nil

=begin
  # grid
  File.open( './conf/grid2.yaml' ) { |f|
    YAML.load_documents( f ) { |d|
      xc = d
      # grid - html
      input = File.read('./template/grid2.html')
      results = ERB.new(input, nil, '-').result()
      output = "./output/html/#{xc.entity_name}Management.html"
      File.open(output, 'w') { |file| file.write(results) }

      # grid - js
      input = File.read('./template/grid2.js')
      results = ERB.new(input, nil, '-').result()
      output = "./output/js/#{xc.entity_name}Management.js"
      File.open(output, 'w') { |file| file.write(results) }

      #puts xc.js_column_style
    }
  }
=end

  # detail
  File.open( './conf/detail.yaml' ) { |f|
    YAML.load_documents( f ) { |d|
      xc = d
      # detail - html
      input = File.read('./template/popup_onecol.html')
      results = ERB.new(input, nil, '-').result()
      output = "./output/html/#{xc.entity_name}Edit.html"
      File.open(output, 'w') { |file| file.write(results) }
=begin
      # grid - js
      input = File.read('./template/grid.js')
      results = ERB.new(input, nil, '-').result()
      output = "./output/js/#{xc.entity_name}Edit.js"
      File.open(output, 'w') { |file| file.write(results) }
      #puts $obj
=end
    }
  }

#end
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
