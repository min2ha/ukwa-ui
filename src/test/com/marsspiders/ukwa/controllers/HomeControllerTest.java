package com.marsspiders.ukwa.controllers;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = HomeController.class)
@AutoConfigureMockMvc(secure=false)
class HomeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    //@MockBean
    //private ProductService productServiceMock;


    @Autowired
    private MockMvc mvc;


    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new HomeController()).build();
    }
    @Test
    public void testIndex() throws Exception{
//        this.mockMvc.perform(get("/ukwa/"))
//                .andExpect(status().isOk())
//                .andExpect(view().name("index"))
//                .andDo(print());

        //assertThat(this.productServiceMock).isNotNull();
        mockMvc.perform(MockMvcRequestBuilders.get("/ukwa"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("text/html;charset=UTF-8"))
                .andExpect(view().name("index"))
                .andExpect(MockMvcResultMatchers.view().name("index"))
                .andExpect(content().string(Matchers.containsString("Spring Framework Guru")))
                .andDo(print());
    }


}
