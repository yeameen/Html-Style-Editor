<%--
  Created by IntelliJ IDEA.
  User: Vantage
  Date: Apr 8, 2010
  Time: 4:28:57 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    
%>
<html>
  <head>
      <title>Simple jsp page</title>
      <script type="text/javascript" src="js/jquery.min.js"></script>
      <script type="text/javascript" src="js/jquery.jstree.js"></script>
  </head>

  <body>
    <div id="tree">
    </div>

    <div id="tree2" style="display:none;">
        <ul>
                <li id="phtml_1">
                    <a href="#">Root node 1</a>
                    <ul>
                        <li id="phtml_2">
                            <a href="#">Child node 1</a>

                        </li>
                        <li id="phtml_3">
                            <a href="#">Child node 2</a>
                        </li>
                    </ul>
                </li>
                <li id="phtml_4">
                    <a href="#">Root node 2</a>

                </li>
            </ul>

    </div>

      <script type="text/javascript">
          $(function() {
              $('#tree').jstree({
                  plugins: ["themes", "json_data"],
                  json_data: {
                      ajax : {
                          url: 'tree.jsp',
                          error: function() {alert("got error");},
                          success: function() {alert("successfull");}
                      }
                  }
              });
          });
      </script>
  </body>
</html>