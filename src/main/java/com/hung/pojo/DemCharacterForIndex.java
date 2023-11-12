package com.hung.pojo;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DemCharacterForIndex {
    private Integer id;
    private String name;
    private String time;
    private Long unixTimestamp;
}
