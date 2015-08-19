#!/usr/bin/env ruby
require 'erb'
require 'yaml'
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# conf / data classes
# ------------------------------------------------------------------------------
class XColumn
  attr_reader :column_name

  def initialize(name = '')
    @column_name = name
    @grid_field
    @width = 100
    @left = false
    @right = true
  end
end

class XConf
  attr_reader :entity_name, :title, :table_data, :data_field, :data_key,
              :two_columns, :show_scroll, :action, :scroll_flag, :columns

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
  end

  def container
    container_scrollable ='<section class="container left minWidth1800" style="width:100%;">'
    container_normal     ='<section class="container left" style="width:100%;">'

    @show_scroll ? container_scrollable : container_normal
  end

=begin
  def buttons
    case entity_name
    when 'OptPriceQualityBand'
      retval = '			<a class="btn btn-Primary {{btn}}" ng-click="btn || addOrEdit()"><i class="icon-edit"></i>Add/Edit</a>'
    when 'OptDefaultRevenueBucket'
      retval = '			<a class="btn btn-Primary {{btn}}" ng-click="save()"><i class="icon-pencil icon-white"></i>Save</a>'
    else
      retval = '			<a class="btn btn-Primary btn-add {{btn}}" ng-click="add()"><i class="icon-plus"></i>Add New Record</a>'
      case entity_name
      when 'OptUser'
        retval += "\n"
        retval += '			<a class="btn btn-Primary btn-delete {{btn}}" ng-click="del();"><i class="icon-trash"></i>Inactive</a>'
      else
        retval += "\n"
        retval += '			<a class="btn btn-Primary btn-delete {{btn}}" ng-click="del();"><i class="icon-trash"></i>Delete</a>'
      end
      retval += "\n"
      retval += '			<a class="btn btn-Primary {{btn}}" ng-click="update()"><i class="icon-pencil icon-white"></i>Edit</a>'
    end
  end
=end

  def buttons
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

  File.open( './conf/grid.yaml' ) { |f|
    YAML.load_documents( f ) { |d|
      xc = d
      input = File.read('./template/grid.html')
      results = ERB.new(input, nil, '-').result()
      out_file = "./output/#{xc.entity_name}Management.html"
      File.open(out_file, 'w') { |file| file.write(results) }

      #puts $obj
    }
  }

=begin
  File.open('template.html', 'r') do |infile|
      while (line = infile.gets)
          render = ERB.new(line)
          puts output = render.result()
      end
  end
=end


#end
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
