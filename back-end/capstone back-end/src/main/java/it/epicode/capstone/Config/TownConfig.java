package it.epicode.capstone.Config;

import it.epicode.capstone.Models.Entities.Province;
import it.epicode.capstone.Models.Entities.Town;
import it.epicode.capstone.Repositories.ProvinceRepository;
import it.epicode.capstone.Repositories.TownRepository;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.charset.Charset;
import java.text.Normalizer;
import java.util.List;

@Component
@Order(2)
public class TownConfig implements CommandLineRunner {
    public static final Logger logger = LoggerFactory.getLogger(TownConfig.class);

    @Autowired
    private TownRepository townRp;

    @Autowired
    private ProvinceRepository provinceRp;



    @Override
    public void run(String... args) throws Exception {
        File file = new File("src/main/resources/comuni-italiani.csv");
        try {
            String content = FileUtils.readFileToString(file, Charset.defaultCharset());
            String[] rows = content.split("\n");
            for (int i = 1; i < rows.length; i++) {
                String[] row = rows[i].split(";");
                String name = removeAccent(row[5].trim());
                String provinceCode = row[13].trim();
                Province p = provinceRp.findById(provinceCode).orElseThrow(() -> new Exception("Province Not Found"));

                List<Town> existingTowns = townRp.findAllByNameAndProvince(name, p);
                if (!existingTowns.isEmpty()) {
                    continue;
                }

                Town town = new Town(name, p);
                townRp.save(town);
                logger.info("Saved Town => " + name);
            }
        } catch (Exception e) {
            logger.error("Error => " + e.getMessage());
        }
    }
    public static String removeAccent(String input) {

        String result = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return result.replaceAll("�", "e");
    }
}
