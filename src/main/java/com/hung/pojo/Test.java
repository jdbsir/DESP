package com.hung.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class Test {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;
    private String name;
}
