#!/usr/bin/env ruby
require 'erb'
require 'yaml'
require_relative 'engine_util'
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# conf / data classes
# ------------------------------------------------------------------------------
class XGrid
  attr_reader :entity_name, :title, :table_data, :data_field, :data_key,
              :two_columns, :show_scroll, :action, :scroll_flag, :columns,
              :fields, :field_width, :left_targets, :right_targets

  def initialize()
    @entity_name
    @title
    @table_data
    @data_field
    @data_key
    @action
    @two_columns = false
    @show_scroll = false

    @columns
    @fields
    @field_width

    @left_targets
    @right_targets
  end

  def entity_name_lower
      EngineUtil::lower_first(entity_name)
  end

  def html_container
    container_scrollable ='<section class="container left minWidth1800" style="width:100%;">'
    container_normal     ='<section class="container left" style="width:100%;">'

    @show_scroll ? container_scrollable : container_normal
  end


  def html_buttons
    # 1. buttons
    add_edit = <<-'EOF'
			<a class="btn btn-Primary {{btn}}" ng-click="btn || addOrEdit()"><i class="icon-edit"></i>Add/Edit</a>
    EOF
    save = <<-'EOF'
			<a class="btn btn-Primary {{btn}}" ng-click="save()"><i class="icon-pencil icon-white"></i>Save</a>
    EOF
    add = <<-'EOF'
			<a class="btn btn-Primary btn-add {{btn}}" ng-click="add()"><i class="icon-plus"></i>Add New Record</a>
    EOF
    del_inactive = <<-'EOF'
			<a class="btn btn-Primary btn-delete {{btn}}" ng-click="del();"><i class="icon-trash"></i>Inactive</a>
    EOF
    delete = <<-'EOF'
			<a class="btn btn-Primary btn-delete {{btn}}" ng-click="del();"><i class="icon-trash"></i>Delete</a>
    EOF
    update = <<-'EOF'
			<a class="btn btn-Primary {{btn}}" ng-click="update()"><i class="icon-pencil icon-white"></i>Edit</a>
    EOF

    # 2. select buttons
    case entity_name
    when 'OptPriceQualityBand'
      retval = add_edit
    when 'OptDefaultRevenueBucket'
      retval = save
    else
      retval = add

      case entity_name
      when 'OptUser'
        retval += del_inactive
      else
        retval += delete
      end

      retval += update
    end

    #retval
  end

  def js_column_style
    two_col_style = "windowClass: 'twoCols',
								size: 'lg'"
    one_col_style = "windowClass : 'oneCol',"


    two_columns ? two_col_style : one_col_style
  end

  def js_use_two_col
    two_col_style = "windowClass: 'twoCols',
								size: 'lg',"

    two_columns ? two_col_style : nil
  end

  def js_elseif_auth_role
    sales_comp_admin = '}else if(authList.role === "Sales Comp Admin"){'
    admin = '}else if(authList.role === "Admin"){'

    if ['OptPriceQualityBand', 'OptSqMccExcp', 'OptSqPricebookExcp'].include?( entity_name )
      sales_comp_admin
    else
      admin
    end
  end

  def js_use_right_targets
    if right_targets != '0'
      ',{ "sClass": "right filterMultiColumn", aTargets: [ <%= xc.right_targets %> ] }'
    else
      nil
    end
  end
end
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Renderer
# ------------------------------------------------------------------------------
#class Renderer
  xc = nil

=begin
  xc1 = xc.new
  xc2 = xc.new
  File.open( '_conf2.yaml', 'w') { |f|
    YAML.dump(xc1, f)
    YAML.dump(xc2, f)
  }
=end

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
=begin
  # edit
  File.open( './conf/grid2.yaml' ) { |f|
    YAML.load_documents( f ) { |d|
      xc = d
      # edit - html
      input = File.read('./template/grid2.html')
      results = ERB.new(input, nil, '-').result()
      output = "./output/html/#{xc.entity_name}Management.html"
      File.open(output, 'w') { |file| file.write(results) }

      # grid - js
      input = File.read('./template/grid.js')
      results = ERB.new(input, nil, '-').result()
      output = "./output/js/#{xc.entity_name}Management.js"
      File.open(output, 'w') { |file| file.write(results) }
      #puts $obj
    }
  }
=end

#end
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
