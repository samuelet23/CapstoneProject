package it.epicode.capstone.Config;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.Entities.Province;
import it.epicode.capstone.Repositories.ProvinceRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

@Component
@Order(1)
public class ProvinceConfig implements CommandLineRunner {

    public static final Logger logger = LoggerFactory.getLogger(ProvinceConfig.class);

    @Autowired
    private ProvinceRepository provinceRp;

    @Override
    public void run(String... args) throws Exception {
        File file = new File("src/main/resources/province-italiane.csv");
        try {
            String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
            String[] rows = content.split("\n");
            for (int i = 1; i < rows.length; i++) {
                String[] row = rows[i].split(";");
                if (row[0].equals("Roma")) row[0] = "RM";

                Province existingProvince = provinceRp.findBySigla(row[0]).orElseThrow(() -> new BadRequestException("Province with sigla"+row[0]+" Not Found"));
                if (existingProvince != null) {
                    return;
                }

                Province provincia = new Province(row[0], row[1], row[2]);
                provinceRp.save(provincia);
                logger.info("Saved province=> " + provincia.getSigla());
            }
        } catch (IOException e) {
            logger.error("Error => " + e.getMessage());
        }
    }
}
