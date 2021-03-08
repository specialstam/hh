package where.data;


public class locationData {
    private String titleName = null;
    private String titleComment = null;
    private Double yPos = null;
    private Double xPos = null;

    public locationData() {

    }

    public locationData(String titleName_, String titleComment_, String yPos_, String xPos_) {
        this.titleName = titleName_;
        this.titleComment = titleComment_;
        this.yPos = Double.parseDouble(yPos_);
        this.xPos = Double.parseDouble(xPos_);
    }

    public Double getYpos() {
        return yPos;
    }

    public Double getXpos() {
        return xPos;
    }

    public String geTitleComment() {
        return titleComment;
    }


}
