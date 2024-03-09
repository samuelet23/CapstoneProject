package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.PlaceDTO;
import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Repositories.PlaceRepository;
import it.epicode.capstone.Repositories.ProvinceRepository;
import it.epicode.capstone.Repositories.TownRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PlaceService {

    public static final Logger logger = LoggerFactory.getLogger(PlaceService.class);

    @Autowired
    private PlaceRepository placeRp;

    @Autowired
    private TownRepository townRp;
    @Autowired
    private ProvinceRepository provinceRp;


    public Page<Place> getAll(Pageable pageable){
        return placeRp.findAll(pageable);
    }
    public Page<Competition> getAllTournamentsByPlaceId(UUID id, Pageable pageable){
        return placeRp.findAllTournamentsByPlaceId(id, pageable);
    }

    public List<Town> getAllTown(){
        return placeRp.findAllTown();
    }
    public List<Province> getAllProvince(){
        return placeRp.findAllProvince();
    }
    public List<String> getAllRegion(){
        return placeRp.findAllRegion();
    }

    public Place getById(UUID id)throws BadRequestException{
        return placeRp.findById(id).orElseThrow(
                () -> new BadRequestException("Place Not Found")
        );
    }
    public Place getByCourtName(String courtName)throws BadRequestException{
        return placeRp.findByCourtName(courtName).orElseThrow(
                () -> new BadRequestException("Place Not Found")
        );
    }
    public Place getByTownName(String townName)throws BadRequestException{
        return placeRp.findByTownName(townName).orElseThrow(
                () -> new BadRequestException("Place Not Found")
        );
    }

    public Place save(PlaceDTO placeDTO) throws BadRequestException {
        Place p = new Place();
        if (!checkPlaceInDatabase(placeDTO.address().townName(), placeDTO.address().siglaProvince())) {
            p.setCourtName(placeDTO.courtName());
            p.setTown(newTown(placeDTO));
            p.setAddress(newAddress(placeDTO));
        }
        return placeRp.save(p);
    }

    public void updateById(PlaceDTO placeDTO, UUID id)throws BadRequestException{
        if (checkPlaceInDatabase(placeDTO.address().townName(), placeDTO.address().siglaProvince())) {
            throw new BadRequestException("Town or province not found in the database");
        }
        Place p = getById(id);
        p.setCourtName(placeDTO.courtName());
        p.setTown(newTown(placeDTO));
        p.setAddress(newAddress(placeDTO));

        placeRp.save(p);
    }
    public void updateByCourtName(PlaceDTO placeDTO, String courtName)throws BadRequestException{
        if (checkPlaceInDatabase(placeDTO.address().townName(), placeDTO.address().siglaProvince())) {
            throw new BadRequestException("Town or province not found in the database");
        }
        Place p = getByCourtName(courtName);
        p.setCourtName(placeDTO.courtName());
        p.setTown(newTown(placeDTO));
        p.setAddress(newAddress(placeDTO));

        placeRp.save(p);
    }


    public void updateCourtName(UUID id, String courtName)throws BadRequestException{
        Place p = getById(id);
        p.setCourtName(courtName);
        placeRp.save(p);
    }

    public void updateAddress(UUID id, Address address)throws BadRequestException{
        Place p = getById(id);
        p.setAddress(address);
        placeRp.save(p);
    }

    public void delete(UUID id)throws BadRequestException{
        Place p = getById(id);
        placeRp.delete(p);
    }

    public Page<Competition> findTournamentsByKeywordInCourtName(String keyword, Pageable pageable){
        return placeRp.findTournamentsByKeywordInCourtName(keyword, pageable);
    }
    public Page<Competition> findTournamentsByKeywordInTownName(String keyword, Pageable pageable){
        return placeRp.findTournamentsByKeywordInTownName(keyword, pageable);
    }
    public Page<Competition> findTournamentsByKeywordInRegion(String keyword, Pageable pageable){
        return placeRp.findTournamentsByKeywordInRegion(keyword, pageable);
    }






    private boolean checkPlaceInDatabase(String townName, String siglaProvincia)throws BadRequestException {
        Province p = provinceRp.findBySigla(siglaProvincia).orElseThrow(
                () -> new BadRequestException("Province with sigla: "+siglaProvincia+"Not Found" )
        );
        logger.info("The sigla "+siglaProvincia+" is Present in Database");

        Town t = townRp.findByName(townName).orElseThrow(
                () -> new BadRequestException("Town with name" +townName+" Not Found")
        );
        logger.info("The town "+townName+" is Present in Database");

        return true;
    }

    private Address newAddress(PlaceDTO placeDTO){
        return new Address(
                placeDTO.address().via(),
                placeDTO.address().civico(),
                placeDTO.address().cap(),
                placeDTO.address().siglaProvince(),
                placeDTO.address().townName()
        );
    }

    private Town newTown(PlaceDTO placeDTO){
        Province p = new Province();
        return new Town(
                p,
                placeDTO.address().townName()
        );
    }

}
