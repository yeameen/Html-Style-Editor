<%
    System.out.println("Received request");
    response.setContentType("text/html");
    response.getWriter().write("This is a test version 2");
    response.flushBuffer();
%>