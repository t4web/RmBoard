define([], function() {
    return '<div class="box-header">\n\
                <h3 class="box-title"><a href="<%=app.getConfig(\'domain\')%>/issues/<%=id%>" target="_blank">#<%=id%></a> <%=name%></h3>\n\
            </div>\n\
            <div class="box-body">\n\
                <small class="label <%=assignee.colorClass%>"><i class="fa fa-user"></i> <%=assignee.nick%></small>\n\
            </div>';
});