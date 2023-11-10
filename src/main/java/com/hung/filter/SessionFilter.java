package com.hung.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter(filterName = "sessionFilter",urlPatterns = "/*")
public class SessionFilter implements Filter {
    private String[] filterExclusionUrls={"/index.html","/favicon.ico"};
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpSession session = httpRequest.getSession();

        String url = httpRequest.getRequestURI().substring(httpRequest.getContextPath().length());
        System.out.println(url);
        if (isFliter(url)) {
            // session内容check
            if (session.getAttribute("weixin_id") != null) {
                chain.doFilter(request, response);
                return;
            } else {
                // session不存在的话，转到login页面
               // httpResponse.sendRedirect(httpRequest.getContextPath() + "/login");
                return;
            }
        }else {
            chain.doFilter(request, response);
            return;
        }

    }

    /**
     * 判断该url是否需要过滤
     *
     * @param url
     * @return
     */
    private boolean isFliter(String url) {
        for (String exclusion : filterExclusionUrls) {
            if (exclusion.equals(url)) {
                return false;
            }
        }
        return true;
    }
}
