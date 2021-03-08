goog.provide('wap.ac.ui.menu.MenuBuilding');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.net.cookies');
goog.require('goog.style');
goog.require('wap.ac.re.gate.OtherCorpSelect');
goog.require('wap.fw.common');
goog.require('wap.ui.DateInput');
goog.require('wap.ui.MultiCheck');
goog.require('wap.ui.Section');

/**
 * @constructor
 */

var testArObjTenantList = [

]
var gImgPath = "data:image/jpg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAHgAoADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooyPWjI9RQAUUZHqKMj1FABRRkeooyPUUAFFGR6ijI9RQAUUZHqKMj1FABRRkeooyPUUAFFGR6ijI9RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUN/ObazknHVUJqaq2s/8guf/AK5H+VAH8mv7Rv8Awcgf8Fm9E+OPjTw/4K/bRurHT9H8VajZ22mr4I0FxBBFcyRptZ7AswCqM7iSDzk9uC/4iYf+C33/AEfNef8AhCeH/wD5Ar5P/aamlt/2m/iFNC5Vl8dasVYdv9MlrnPD/g7xL8QdSXS/AXhe/wBU1F1LNpelWTzysB1dEQFivqAOPpRuB9p/8RMP/Bb7/o+a8/8ACE8P/wDyBR/xEw/8Fvv+j5rz/wAITw// APIFfKQ/ZR/akIyP2a/H/wD4R19/8ao/4ZQ/al/6Nr8f/wDhG33/AMaquSfYnnh3Pq3/AIiYf+C33/R815/4Qnh//wCQKP8AiJh/4Lff9HzXn/hCeH//AJAr5S/4ZQ/al/6Nr8f/APhG33/xqj/hlD9qX/o2vx//AOEbff8Axqjkn2Dnh3Pq3/iJh/4Lff8AR815/wCEJ4f/APkCj/iJh/4Lff8AR815/wCEJ4f/APkCvlL/AIZQ/al/6Nr8f/8AhG33/wAao/4ZQ/al/wCja/H/AP4Rt9/8ao5J9g54dz6t/wCImH/gt9/0fNef+EJ4f/8AkCj/AIiYf+C33/R815/4Qnh//wCQK+Uv+GUP2pf+ja/H/wD4Rt9/8ao/4ZQ/al/6Nr8f/wDhG33/AMao5J9g54dz6t/4iYf+C33/AEfNef8AhCeH/wD5Ao/4iYf+C33/AEfNef8AhCeH/wD5Ar5S/wCGUP2pf+ja/H//AIRt9/8AGqP+GUP2pf8Ao2vx/wD+Ebff/GqOSfYOeHc+rf8AiJh/4Lff9HzXn/hCeH//AJArp/hV/wAHJv8AwWhufiF4ft/Ff7al3eWd5rNrDLYHwToKCeJplVtzLYhlUgkcEE9iOtfBHifwL4s+G+pnSfiN4Q1LR9REYdNL1exktpip6OySAME4445xx3qX4YTS3HxU8OTTOWZtfs8k/wDXZKnYrc/uw+C/jK78efDvTfE96oEl1bq7Y9SK6uvOf2VP+SIaF/14p/IV6NQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFVtZ/5Bc/8A1yP8qs1W1n/kFz/9cj/KgD+EX9qD/k5b4if9j1q//pZLXvv/AARHsbXUf+Cg3hizvYFkiewuwyMMg/IK8C/ag/5OW+In/Y9av/6WS19Bf8EOv+Uh/hb/AK8bv/0AVthv94h6r8zKv/Al6M/pQ0z4VeAWsIifDFpkoM/uR6VP/wAKp8Af9Cxaf9+RW3pf/IPi/wCuY/lU9fapKx8jzSOd/wCFU+AP+hYtP+/Io/4VT4A/6Fi0/wC/IroqKLIOZnO/8Kp8Af8AQsWn/fkUf8Kp8Af9Cxaf9+RXRUUWQczOd/4VT4A/6Fi0/wC/Io/4VT4A/wChYtP+/IroqKLIOZnO/wDCqfAH/QsWn/fkUN8KfAGD/wAUxadP+eIroqG6H6UWQczP5vv+DjzRtM0H/gpXqGnaTZpBCvg/TCI41wMnza+KvhV/yVDw3/2H7P8A9HpX29/wcp/8pONS/wCxN0v+UtfEPwq/5Kh4b/7D9n/6PSvjMXpip+r/ADPrML/u0PRfkf3Mfsqf8kQ0L/rxT+Qr0avOf2VP+SIaF/14p/IV6NXObhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVW1n/AJBc/wD1yP8AKrNVtZ/5Bc//AFyP8qAP4Rf2oP8Ak5b4if8AY9av/wClktfQX/BDr/lIf4W/68bv/wBAFfPv7UH/ACct8RP+x61f/wBLJa+gv+CHX/KQ/wALf9eN3/6AK3w3+8Q9V+ZjiP4EvRn9OWl/8g+L/rmP5VPUGl/8g+L/AK5j+VT19qtj5EKKKKACiiigAooooAKG6H6UUN0P0oA/nH/4OU/+UnGpf9ibpf8AKWviH4Vf8lQ8N/8AYfs//R6V9vf8HKf/ACk41L/sTdL/AJS18Q/Cr/kqHhv/ALD9n/6PSvjMZ/vU/V/mfW4X/doei/I/uY/ZU/5IhoX/AF4p/IV6NXnP7Kn/ACRDQv8ArxT+Qr0auY3CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqtrP/ILn/65H+VWaraz/wAguf8A65H+VAH8Iv7UH/Jy3xE/7HrV/wD0slr6C/4Idf8AKQ/wt/143f8A6AK+ff2oP+TlviJ/2PWr/wDpZLX0F/wQ6/5SH+Fv+vG7/wDQBW+G/wB4h6r8zHEfwJejP6ctL/5B8X/XMfyqeoNL/wCQfF/1zH8qnr7VbHyIUUUUAFFFFABRRRQAUN0P0oobofpQB/OP/wAHKf8Ayk41L/sTdL/lLXwx4O1E+HvEVh4sli3x6bfw3GzdjzWjcOEB9Tjr2Bz6A/eH/ByTYF/+CmWp311lLdfB+lguOrtiX5V9T/Lqe2fz/urprlx8oREGI416KP8APfvXxmM/3qfq/wAz63C/7tD0X5H7a/DL/g9F+J/w18GWXg61/YJ0a6SyhEazv8Q5ULYGM4FicfnW/wD8RwXxX/6R8aJ/4ceX/wCQK/CaiuY3P3Z/4jgviv8A9I+NE/8ADjy//IFH/EcF8V/+kfGif+HHl/8AkCvwmooA/dn/AIjgviv/ANI+NE/8OPL/APIFH/EcF8V/+kfGif8Ahx5f/kCvwmooA/dn/iOC+K//AEj40T/w48v/AMgUf8RwXxX/AOkfGif+HHl/+QK/CaigD92f+I4L4r/9I+NE/wDDjy//ACBR/wARwXxX/wCkfGif+HHl/wDkCvwmooA/dn/iOC+K/wD0j40T/wAOPL/8gUf8RwXxX/6R8aJ/4ceX/wCQK/CaigD92f8AiOC+K/8A0j40T/w48v8A8gVa0X/g9z+KWq6zaaXN+wBosKXNzHE0o+IsrbAzAFsfYRnGc4yK/Byr3hkZ8SaeB/z/AEX/AKGKAP3LP/B8F8Vu3/BPjRP/AA5Ev/yBR/xHBfFf/pHxon/hx5f/AJAr8JqKAP3Z/wCI4L4r/wDSPjRP/Djy/wDyBR/xHBfFf/pHxon/AIceX/5Ar8JqKAP3Z/4jgviv/wBI+NE/8OPL/wDIFH/EcF8V/wDpHxon/hx5f/kCvwmooA/dn/iOC+K//SPjRP8Aw48v/wAgUf8AEcF8V/8ApHxon/hx5f8A5Ar8JqKAP3Z/4jgviv8A9I+NE/8ADjy//IFH/EcF8V/+kfGif+HHl/8AkCvwmooA/dn/AIjgviv/ANI+NE/8OPL/APIFH/EcF8V/+kfGif8Ahx5f/kCvwmooA/dn/iOC+K//AEj40T/w48v/AMgUf8RwXxX/AOkfGif+HHl/+QK/CaigD92f+I4L4r/9I+NE/wDDjy//ACBR/wARwXxX/wCkfGif+HHl/wDkCvwmooA/dn/iOC+K/wD0j40T/wAOPL/8gUf8RwXxX/6R8aJ/4ceX/wCQK/CaigD92f8AiOC+K/8A0j40T/w48v8A8gUf8RwXxX/6R8aJ/wCHHl/+QK/CaigD92f+I4L4r/8ASPjRP/Djy/8AyBR/xHBfFf8A6R8aJ/4ceX/5Ar8JqKAP3Z/4jgviv/0j40T/AMOPL/8AIFH/ABHBfFf/AKR8aJ/4ceX/AOQK/CaigD92f+I4L4r/APSPjRP/AA48v/yBR/xHBfFf/pHxon/hx5f/AJAr8JqKAP3Z/wCI4L4r/wDSPjRP/Djy/wDyBR/xHBfFf/pHxon/AIceX/5Ar8JqKAP3Z/4jgviv/wBI+NE/8OPL/wDIFH/EcF8V/wDpHxon/hx5f/kCvwmooA/dn/iOC+K//SPjRP8Aw48v/wAgUf8AEcF8V/8ApHxon/hx5f8A5Ar8JqKAP3Z/4jgviv8A9I+NE/8ADjy//IFH/EcF8V/+kfGif+HHl/8AkCvwmooA/dn/AIjgviv/ANI+NE/8OPL/APIFfQf/AATO/wCDrLxd+3f+1z4X/Zp8a/sjaZ4QtvEiXRj1a08ZSXskZht5JQfKa1jG1im3O7vwDg1/NZBBFaxLeXiBiwzDCf4/9o/7P8/zNfY3/BAWea4/4KvfDSeaQszSX+T/ANuU1AH9lNncrd2qXKdHUEVJVPw//wAgW2/64r/KrlABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVbWf+QXP/wBcj/KrNVtZ/wCQXP8A9cj/ACoA/hF/ag/5OW+In/Y9av8A+lktfQX/AAQ6/wCUh/hb/rxu/wD0AV8+/tQf8nLfET/setX/APSyWvoL/gh1/wApD/C3/Xjd/wDoArfDf7xD1X5mOI/gS9Gf05aX/wAg+L/rmP5VPUGl/wDIPi/65j+VT19qtj5EKKKKACiiigAooooAKOtFFAHjnx4/YP8A2YP2jvEQ8XfFn4M+Gta1QRLF/aOpaHbzzlB0XzHQtgdhnFef/wDDn79hH/o3fwj/AOE3a/8AxuvqOispUKMndxRoq1WKspM+XP8Ahz9+wj/0bv4R/wDCbtf/AI3R/wAOfv2Ef+jd/CP/AITdr/8AG6+o6KX1eh/KvuH7et/Mz5c/4c/fsI/9G7+Ef/Cbtf8A43R/w5+/YR/6N38I/wDhN2v/AMbr6joo+r0P5V9we3rfzM+XP+HP37CP/Ru/hH/wm7X/AON0f8Ofv2Ef+jd/CP8A4Tdr/wDG6+o6KPq9D+VfcHt638zPlz/hz9+wj/0bv4R/8Ju1/wDjdH/Dn79hH/o3fwj/AOE3a/8AxuvqOij6vQ/lX3B7et/Mz5c/4c/fsI/9G7+Ef/Cbtf8A43R/w5+/YR/6N38I/wDhN2v/AMbr6joo+r0P5V9we3rfzM+XP+HP37CP/Ru/hH/wm7X/AON0f8Ofv2Ef+jd/CP8A4Tdr/wDG6+o6KPq9D+VfcHt638zPlz/hz9+wj/0bv4R/8Ju1/wDjdOh/4JCfsK28yzxfs9eEldGDKw8OWoII6Efu6+oaKPq9D+VfcHt638zPl1/+CQP7CLtu/wCGdfCA9h4btf8A43Sf8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N0f8Ofv2Ef+jd/CP/hN2v8A8br6joo+r0P5V9we3rfzM+XP+HP37CP/AEbv4R/8Ju1/+N1Hd/8ABIL9hOK2eRf2ePCOQpI/4py1/wDjdfU9Q6h/x5yf7h/lR9Xofyr7hqvWv8TP5Cv2n9E0/wAM/tK/ELw1pFskNppvjfVbS0gjUKsUUV5KiIoHAAVQAB0Ar6T/AODf/wD5Ss/DP/rpf/8ApFNXzx+2B/ydp8Uf+yi63/6XzV9D/wDBv/8A8pWfhn/10v8A/wBIpq+Kl8TPrY/Cj+yTw/8A8gW2/wCuK/yq5VPw/wD8gW2/64r/ACq5SGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFVtZ/5Bc//AFyP8qs1W1n/AJBc/wD1yP8AKgD+EX9qD/k5b4if9j1q/wD6WS19Bf8ABDr/AJSH+Fv+vG7/APQBXz7+1B/yct8RP+x61f8A9LJa+gv+CHX/ACkP8Lf9eN3/AOgCt8N/vEPVfmY4j+BL0Z/Tlpf/ACD4v+uY/lU9QaX/AMg+L/rmP5VPX2q2PkQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKh1D/jzk/wBw/wAqmqHUP+POT/cP8qAW5/It+2B/ydp8Uf8Asout/wDpfNX0P/wb/wD/AClZ+Gf/AF0v/wD0imr54/bA/wCTtPij/wBlF1v/ANL5q+h/+Df/AP5Ss/DP/rpf/wDpFNXwsviZ9lH4Uf2SeH/+QLbf9cV/lVyqfh//AJAtt/1xX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKraz/AMguf/rkf5VZqtrP/ILn/wCuR/lQB/CL+1B/yct8RP8AsetX/wDSyWvoL/gh1/ykP8Lf9eN3/wCgCvn39qD/AJOW+In/AGPWr/8ApZLX0F/wQ6/5SH+Fv+vG7/8AQBW+G/3iHqvzMcR/Al6M/py0v/kHxf8AXMfyqeoNL/5B8X/XMfyqevtVsfIhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDqH/HnJ/uH+VTVDqH/AB5yf7h/lQC3P5Fv2wP+TtPij/2UXW//AEvmr6H/AODf/wD5Ss/DP/rpf/8ApFNXzx+2B/ydp8Uf+yi63/6XzV9D/wDBv/8A8pWfhn/10v8A/wBIpq+Fl8TPso/Cj+yTw/8A8gW2/wCuK/yq5VPw/wD8gW2/64r/ACq5UlBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVbWf+QXP/ANcj/KrNVtZ/5Bc//XI/yoA/hF/ag/5OW+In/Y9av/6WS19Bf8EOv+Uh/hb/AK8bv/0AV8+/tQf8nLfET/setX/9LJa+gv8Agh1/ykP8Lf8AXjd/+gCt8N/vEPVfmY4j+BL0Z/Tlpf8AyD4v+uY/lU9QaX/yD4v+uY/lU9farY+RCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqHUP8Ajzk/3D/Kpqh1D/jzk/3D/KgFufyLftgf8nafFH/sout/+l81fQ//AAb/AP8AylZ+Gf8A10v/AP0imr54/bA/5O0+KP8A2UXW/wD0vmr6H/4N/wD/AJSs/DP/AK6X/wD6RTV8LL4mfZR+FH9knh//AJAtt/1xX+VXKp+H/wDkC23/AFxX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKraz/yC5/+uR/lVmq2s/8AILn/AOuR/lQB/CL+1B/yct8RP+x61f8A9LJa+gv+CHX/ACkP8Lf9eN3/AOgCvn39qD/k5b4if9j1q/8A6WS19Bf8EOv+Uh/hb/rxu/8A0AVvhv8AeIeq/MxxH8CXoz+nLS/+QfF/1zH8qnqDS/8AkHxf9cx/Kp6+1Wx8iFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUOof8ecn+4f5VNUOof8ecn+4f5UAtz+Rb9sD/AJO0+KP/AGUXW/8A0vmr6H/4N/8A/lKz8M/+ul//AOkU1fPH7YH/ACdp8Uf+yi63/wCl81fQ/wDwb/8A/KVn4Z/9dL//ANIpq+Fl8TPso/Cj+yTw/wD8gW2/64r/ACq5VPw//wAgW2/64r/KrlSUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFVtZ/wCQXP8A9cj/ACqzVbWf+QXP/wBcj/KgD+EX9qD/AJOW+In/AGPWr/8ApZLX0F/wQ6/5SH+Fv+vG7/8AQBXz7+1B/wAnLfET/setX/8ASyWvoL/gh1/ykP8AC3/Xjd/+gCt8N/vEPVfmY4j+BL0Z/Tlpf/IPi/65j+VT1Bpf/IPi/wCuY/lU9farY+RCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqHUP+POT/cP8qmqHUP+POT/AHD/ACoBbn8i37YH/J2nxR/7KLrf/pfNX0P/AMG//wDylZ+Gf/XS/wD/AEimr54/bA/5O0+KP/ZRdb/9L5q+h/8Ag3//AOUrPwz/AOul/wD+kU1fCy+Jn2UfhR/ZJ4f/AOQLbf8AXFf5Vcqn4f8A+QLbf9cV/lVypKCiiigAooooAKKKKACiiigAooooAKKKKACq2s/8guf/AK5H+VWaraz/AMguf/rkf5UAfwi/tQf8nLfET/setX/9LJa+gv8Agh1/ykP8Lf8AXjd/+gCvn39qD/k5b4if9j1q/wD6WS19Bf8ABDr/AJSH+Fv+vG7/APQBW+G/3iHqvzMcR/Al6M/py0v/AJB8X/XMfyqeoNL/AOQfF/1zH8qnr7VbHyIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFQ6h/wAecn+4f5VNUOof8ecn+4f5UAtz+Rb9sD/k7T4o/wDZRdb/APS+avof/g3/AP8AlKz8M/8Arpf/APpFNXzx+2B/ydp8Uf8Asout/wDpfNX0P/wb/wD/AClZ+Gf/AF0v/wD0imr4WXxM+yj8KP7JPD//ACBbb/riv8quVT8P/wDIFtv+uK/yq5UlBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVbWf+QXP/1yP8qs1W1n/kFz/wDXI/yoA/hF/ag/5OW+In/Y9av/AOlktfQX/BDr/lIf4W/68bv/ANAFfPv7UH/Jy3xE/wCx61f/ANLJa+gv+CHX/KQ/wt/143f/AKAK3w3+8Q9V+ZjiP4EvRn9OWl/8g+L/AK5j+VT1Bpf/ACD4v+uY/lU9farY+RCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqHUP+POT/cP8qmqHUP8Ajzk/3D/KgFufyLftgf8AJ2nxR/7KLrf/AKXzV9D/APBv/wD8pWfhn/10v/8A0imr54/bA/5O0+KP/ZRdb/8AS+avof8A4N//APlKz8M/+ul//wCkU1fCy+Jn2UfhR/ZJ4f8A+QLbf9cV/lVyqfh//kC23/XFf5VcqSgooooAKKKKACiiigAooooAKKKKACiiigAqtrP/ACC5/wDrkf5VZqtrP/ILn/65H+VAH8Iv7UH/ACct8RP+x61f/wBLJa+gv+CHX/KQ/wALf9eN3/6AK+ff2oP+TlviJ/2PWr/+lktfQX/BDr/lIf4W/wCvG7/9AFb4b/eIeq/MxxH8CXoz+nLS/wDkHxf9cx/Kp6g0v/kHxf8AXMfyqevtVsfIhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDqH/HnJ/uH+VTVDqH/HnJ/uH+VALc/kW/bA/5O0+KP/ZRdb/9L5q+h/8Ag3//AOUrPwz/AOul/wD+kU1fPH7YH/J2nxR/7KLrf/pfNX0P/wAG/wD/AMpWfhn/ANdL/wD9Ipq+Fl8TPso/Cj+yTw//AMgW2/64r/KrlU/D/wDyBbb/AK4r/KrlSUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFVtZ/5Bc//AFyP8qs1W1n/AJBc/wD1yP8AKgD+EX9qD/k5b4if9j1q/wD6WS19Bf8ABDr/AJSH+Fv+vG7/APQBXz7+1B/yct8RP+x61f8A9LJa+gv+CHX/ACkP8Lf9eN3/AOgCt8N/vEPVfmY4j+BL0Z/Tlpf/ACD4v+uY/lU9QaX/AMg+L/rmP5VPX2q2PkQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKh1D/jzk/wBw/wAqmqHUP+POT/cP8qAW5/It+2B/ydp8Uf8Asout/wDpfNX0P/wb/wD/AClZ+Gf/AF0v/wD0imr54/bA/wCTtPij/wBlF1v/ANL5q+h/+Df/AP5Ss/DP/rpf/wDpFNXwsviZ9lH4Uf2SeH/+QLbf9cV/lVyqfh//AJAtt/1xX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKraz/AMguf/rkf5VZqtrP/ILn/wCuR/lQB/CL+1B/yct8RP8AsetX/wDSyWvoL/gh1/ykP8Lf9eN3/wCgCvn39qD/AJOW+In/AGPWr/8ApZLX0F/wQ6/5SH+Fv+vG7/8AQBW+G/3iHqvzMcR/Al6M/py0v/kHxf8AXMfyqeoNL/5B8X/XMfyqevtVsfIhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVDqH/HnJ/uH+VTVDqH/AB5yf7h/lQC3P5Fv2wP+TtPij/2UXW//AEvmr6H/AODf/wD5Ss/DP/rpf/8ApFNXzx+2B/ydp8Uf+yi63/6XzV9D/wDBv/8A8pWfhn/10v8A/wBIpq+Fl8TPso/Cj+yTw/8A8gW2/wCuK/yq5VPw/wD8gW2/64r/ACq5UlBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABVbWf+QXP/ANcj/KrNVtZ/5Bc//XI/yoA/hF/ag/5OW+In/Y9av/6WS19Bf8EOv+Uh/hb/AK8bv/0AV8+/tQf8nLfET/setX/9LJa+gv8Agh1/ykP8Lf8AXjd/+gCt8N/vEPVfmY4j+BL0Z/Tlpf8AyD4v+uY/lU9QaX/yD4v+uY/lU9farY+RCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqHUP8Ajzk/3D/Kpqh1D/jzk/3D/KgFufyLftgf8nafFH/sout/+l81fQ//AAb/AP8AylZ+Gf8A10v/AP0imr54/bA/5O0+KP8A2UXW/wD0vmr6H/4N/wD/AJSs/DP/AK6X/wD6RTV8LL4mfZR+FH9knh//AJAtt/1xX+VXKp+H/wDkC23/AFxX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKraz/yC5/+uR/lVmq2s/8AILn/AOuR/lQB/CL+1B/yct8RP+x61f8A9LJa93/4Iq69onhn9vzw1rXiLVraxs4bC6Mt1dzrHGmVAGWYgDk4rw39pW0kvP2m/iIiMqqvjjV2kkc4VF+2y8n8x7kkAAkgVxN3dxtELKyDLbq2fm4aVum9vfk4HRQe5JJunP2dRS7ETjzwce5/XXp37Tf7PCWMSt8b/CYPljIPiG29P9+p/wDhp39nf/ouHhL/AMKG2/8Ai6/kFor2P7aqfyL7zy/7Ip/zM/r6/wCGnf2d/wDouHhL/wAKG2/+Lo/4ad/Z3/6Lh4S/8KG2/wDi6/kFoo/tqp/IvvD+yKf8zP6+v+Gnf2d/+i4eEv8Awobb/wCLo/4ad/Z3/wCi4eEv/Chtv/i6/kFqxbW8UcYvb0Hy8/u484Mp/oPU/gPY/tqp/IvvD+yKf8zP7FPCPj/wT4+sm1PwT4r07V7ZZDG1xpt4k6BhgldyEjPI49xWxX5N/wDBrh4j1W//AGfPFem3N0TCvjS4dIhwqf6JaDAHYYAr9ZK9rDVniKCqNWueRiKSoVnBdAooorcxCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACodQ/wCPOT/cP8qmqHUP+POT/cP8qAW5/It+2B/ydp8Uf+yi63/6XzV9D/8ABv8A/wDKVn4Z/wDXS/8A/SKavnj9sD/k7T4o/wDZRdb/APS+avof/g3/AP8AlKz8M/8Arpf/APpFNXwsviZ9lH4Uf2SeH/8AkC23/XFf5Vcqn4f/AOQLbf8AXFf5VcqSgooooAKKKKACiiigAooooAKKKKACiiigAqHUIWuLKWFerIQKmooA/mf/AGlP+DTf9tnxR8Y/E3iTwj8V/Cb6drHiG81GJTbXO9jNM8mXO3BI3kADhR6kszcB/wAQi/7ff/RSfCn/AID3P/xNf1OmKNjlkB/CjyIf+ea/lQB/LF/xCL/t9/8ARSfCn/gPc/8AxNH/ABCL/t9/9FJ8Kf8AgPc//E1/U75EP/PNfyo8iH/nmv5UAfyxf8Qi/wC33/0Unwp/4D3P/wATR/xCL/t9/wDRSfCn/gPc/wDxNf1O+RD/AM81/KjyIf8Anmv5UAfyCfty/wDBvT+1Z/wT/wD2cNa/ag+L/jPQb7Q9CntIrm00+KdZZGuLmO3TBZQAN8qk+wOOa+A7i4lupTLKRnGAAMADsAOwr+tj/g65jjT/AIIp/EoqgH/E38PdB/1GrOv5JKAP3A/4NYv+SGeLf+xwn/8ASW1r9dK/Iv8A4NYv+SGeLf8AscJ//SW1r9dK+vy7/c4ny+P/AN6kFFFFdpxhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUOof8ecn+4f5VNUOof8AHnJ/uH+VALc/kW/bA/5O0+KP/ZRdb/8AS+avof8A4N//APlKz8M/+ul//wCkU1fPH7YH/J2nxR/7KLrf/pfNX0P/AMG//wDylZ+Gf/XS/wD/AEimr4WXxM+yj8KP7JPD/wDyBbb/AK4r/KrlU/D/APyBbb/riv8AKrlSUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH5wf8AB13/AMoU/iV/2F/D3/p6s6/kir+t3/g67/5Qp/Er/sL+Hv8A09WdfyRUAfuB/wAGsX/JDPFv/Y4T/wDpLa1+ulfkX/waxf8AJDPFv/Y4T/8ApLa1+ulfX5d/ucT5fH/71IKKKK7TjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACodQ/485P8AcP8AKpqh1D/jzk/3D/KgFufyLftgf8nafFH/ALKLrf8A6XzV9D/8G/8A/wApWfhn/wBdL/8A9Ipq+eP2wP8Ak7T4o/8AZRdb/wDS+avof/g3/wD+UrPwz/66X/8A6RTV8LL4mfZR+FH9knh//kC23/XFf5Vcqn4f/wCQLbf9cV/lVypKCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD84P+Drv/lCn8Sv+wv4e/8AT1Z1/JFX9bv/AAdd/wDKFP4lf9hfw9/6erOv5IqAP3A/4NYv+SGeLf8AscJ//SW1r9dK/Iv/AINYv+SGeLf+xwn/APSW1r9dK+vy7/c4ny+P/wB6kFFFFdpxhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUOof8ecn+4f5VNUOof8ecn+4f5UAtz+Rb9sD/k7T4o/9lF1v/0vmr6H/wCDf/8A5Ss/DP8A66X/AP6RTV88ftgf8nafFH/sout/+l81fQ//AAb/AP8AylZ+Gf8A10v/AP0imr4WXxM+yj8KP7JPD/8AyBbb/riv8quVT8P/APIFtv8Ariv8quVJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfnB/wdd/8AKFP4lf8AYX8Pf+nqzr+SKv63f+Drv/lCn8Sv+wv4e/8AT1Z1/JFQB+4H/BrF/wAkM8W/9jhP/wCktrX66V+Rf/BrF/yQzxb/ANjhP/6S2tfrpX1+Xf7nE+Xx/wDvUgooortOMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKh1D/jzk/3D/Kpqh1D/AI85P9w/yoBbn8i37YH/ACdp8Uf+yi63/wCl81fQ/wDwb/8A/KVn4Z/9dL//ANIpq+eP2wP+TtPij/2UXW//AEvmr6H/AODf/wD5Ss/DP/rpf/8ApFNXwsviZ9lH4Uf2SeH/APkC23/XFf5Vcqn4f/5Att/1xX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPzg/wCDrv8A5Qp/Er/sL+Hv/T1Z1/JFX9bv/B13/wAoU/iV/wBhfw9/6erOv5IqAP3A/wCDWL/khni3/scJ/wD0lta/XSvyL/4NYv8Akhni3/scJ/8A0lta/XSvr8u/3OJ8vj/96kFFFFdpxhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUOof8AHnJ/uH+VTVDqH/HnJ/uH+VALc/kW/bA/5O0+KP8A2UXW/wD0vmr6H/4N/wD/AJSs/DP/AK6X/wD6RTV88ftgf8nafFH/ALKLrf8A6XzV9D/8G/8A/wApWfhn/wBdL/8A9Ipq+Fl8TPso/Cj+yTw//wAgW2/64r/KrlU/D/8AyBbb/riv8quVJQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfnB/wdd/8oU/iV/2F/D3/AKerOv5Iq/rd/wCDrv8A5Qp/Er/sL+Hv/T1Z1/JFQB+4H/BrF/yQzxb/ANjhP/6S2tfrpX5F/wDBrF/yQzxb/wBjhP8A+ktrX66V9fl3+5xPl8f/AL1IKKKK7TjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACodQ/485P9w/yqaodQ/485P8AcP8AKgFufyLftgf8nafFH/sout/+l81fQ/8Awb//APKVn4Z/9dL/AP8ASKavnj9sD/k7T4o/9lF1v/0vmr6H/wCDf/8A5Ss/DP8A66X/AP6RTV8LL4mfZR+FH9knh/8A5Att/wBcV/lVyqfh/wD5Att/1xX+VXKkoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPzg/4Ou/8AlCn8Sv8AsL+Hv/T1Z1/JFX9bv/B13/yhT+JX/YX8Pf8Ap6s6/kioA/cD/g1i/wCSGeLf+xwn/wDSW1r9dK/Iv/g1i/5IZ4t/7HCf/wBJbWv10r6/Lv8Ac4ny+P8A96kFFFFdpxhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUOof8ecn+4f5VNUOof8ecn+4f5UAtz+Rb9sD/AJO0+KP/AGUXW/8A0vmr6H/4N/8A/lKz8M/+ul//AOkU1fPH7YH/ACdp8Uf+yi63/wCl81fQ/wDwb/8A/KVn4Z/9dL//ANIpq+Fl8TPso/Cj+yTw/wD8gW2/64r/ACq5VPw//wAgW2/64r/KrlSUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH5wf8HXf/KFP4lf9hfw9/6erOv5Iq/rd/4Ou/8AlCn8Sv8AsL+Hv/T1Z1/JFQB+4H/BrF/yQzxb/wBjhP8A+ktrX66V+RX/AAayyJH8DPFhdgP+Kwn6n/p1ta/XL7RB/wA9l/Ovr8u/3OJ8vj/96kPopn2iD/nsv50faIP+ey/nXacY+imfaIP+ey/nR9og/wCey/nQA+imfaIP+ey/nR9og/57L+dAD6KZ9og/57L+dH2iD/nsv50APopn2iD/AJ7L+dH2iD/nsv50APopn2iA9JV/Oj7RB/z2X86AH0Uz7RB/z2X86PtEH/PZfzoAfRTPtEH/AD2X86PtEH/PZfzoAfRTPtEH/PZfzo+0Qf8APZfzoAfRTPtEH/PZfzo+0Qf89l/OgB9FM+0Qf89l/Oj7RB/z2X86AH0Uz7RB/wA9l/Oj7RB/z2X86AH0Uz7RB/z2X86PtEH/AD2X86AH0Uz7RB/z2X86PtEH/PZfzoAfRTPtEH/PZfzo+0Qf89l/OgB9FM+0Qf8APZfzo+0Qf89l/OgB9FM+0Qf89l/Oj7RB/wA9l/OgB9FM+0Qf89l/Oj7RB/z2X86AH0Uz7RB/z2X86PtEH/PZfzoAfRTPtEH/AD2X86PtEH/PZfzoAfRTPtEH/PZfzo+0Qf8APZfzoAfRTPtEH/PZfzo+0Qf89l/OgB9FM+0Qf89l/Oj7RB/z2X86AH0Uz7RB/wA9l/Oj7RB/z2X86AH0Uz7RB/z2X86PtEH/AD2X86AH1DqH/HnJ/uH+VP8AtEH/AD2X86hv7iD7HJ++X7h7+1A1ufyM/tgf8nafFH/sout/+l81fQ//AAb/AP8AylZ+Gf8A10v/AP0imr54/a/IP7WnxRIOQfiLreD/ANv81fQ//Bv/AP8AKVn4Z/8AXS//APSKavhZfEz7GPwo/sk8P/8AIFtv+uK/yq5VPw//AMgW2/64r/KrlSUFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH5wf8HXf/KFP4lf9hfw9/wCnqzr+Sizs/tO6WWTy4I8ebKRnGegA7scHA9iTgAkf2Mf8HDX7L3xm/bE/4Ja+OvgR8A/CL654m1K+0ie002K5hhaWO31K2uJdrTyRx7hHG5AZ1BIAyM1/M1qn/BD7/gqz532Qfsc6vDFCSI4Rr+mNt9SSLn5mOBk+wAwAAAD5/wDh9+0x+0J8HbSTS/gr8cvGXg2ykkLvaeGPFN3YpI5ABdxBIgdyAMsR2AGAAB0n/DwP9vT/AKPc+L3/AIcrVP8A4/XqX/Djr/gqr/0aBq//AIPNN/8Akmj/AIcdf8FVf+jQNX/8Hmm//JNWqlRKybJcIN3aPLf+Hgf7en/R7nxe/wDDlap/8fo/4eB/t6f9HufF7/w5Wqf/AB+vUv8Ahx1/wVV/6NA1f/weab/8k0f8OOv+Cqv/AEaBq/8A4PNN/wDkmn7Wr/M/vF7On2R5b/w8D/b0/wCj3Pi9/wCHK1T/AOP0f8PA/wBvT/o9z4vf+HK1T/4/XqX/AA46/wCCqv8A0aBq/wD4PNN/+SaP+HHX/BVX/o0DV/8Aweab/wDJNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/8OVqn/wAfo/4eB/t6f9HufF7/AMOVqn/x+vUv+HHX/BVX/o0DV/8Aweab/wDJNH/Djr/gqr/0aBq//g803/5Jo9rV/mf3h7On2R5b/wAPA/29P+j3Pi9/4crVP/j9H/DwP9vT/o9z4vf+HK1T/wCP16l/w46/4Kq/9Ggav/4PNN/+SaP+HHX/AAVV/wCjQNX/APB5pv8A8k0e1q/zP7w9nT7I8t/4eB/t6f8AR7nxe/8ADlap/wDH6P8Ah4H+3p/0e58Xv/Dlap/8fr1L/hx1/wAFVf8Ao0DV/wDweab/APJNH/Djr/gqr/0aBq//AIPNN/8Akmj2tX+Z/eHs6fZHnelf8FBP28BY6lv/AG1vi2x+xLsZviPqhKHz4uR+/wCDjIyOxI71R/4eB/t6f9HufF7/AMOVqn/x+vXdN/4Ief8ABVIWt9E37IWrhpLULGP7b035j5sbY/4+fQE/hVQ/8EOf+CqwOD+yBq//AIPNN/8Akmj2tX+Z/eHs6fZHlv8Aw8D/AG9P+j3Pi9/4crVP/j9H/DwP9vT/AKPc+L3/AIcrVP8A4/XqX/Djr/gqr/0aBq//AIPNN/8Akmj/AIcdf8FVf+jQNX/8Hmm//JNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/wDDlap/8fo/4eB/t6f9HufF7/w5Wqf/AB+vUv8Ahx1/wVV/6NA1f/weab/8k0f8OOv+Cqv/AEaBq/8A4PNN/wDkmj2tX+Z/eHs6fZHlv/DwP9vT/o9z4vf+HK1T/wCP0f8ADwP9vT/o9z4vf+HK1T/4/XqX/Djr/gqr/wBGgav/AODzTf8A5Jo/4cdf8FVf+jQNX/8AB5pv/wAk0e1q/wAz+8PZ0+yPLf8Ah4H+3p/0e58Xv/Dlap/8fo/4eB/t6f8AR7nxe/8ADlap/wDH69S/4cdf8FVf+jQNX/8AB5pv/wAk0f8ADjr/AIKq/wDRoGr/APg803/5Jo9rV/mf3h7On2R5b/w8D/b0/wCj3Pi9/wCHK1T/AOP0f8PA/wBvT/o9z4vf+HK1T/4/XqX/AA46/wCCqv8A0aBq/wD4PNN/+SaP+HHX/BVX/o0DV/8Aweab/wDJNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/8OVqn/wAfo/4eB/t6f9HufF7/AMOVqn/x+vUv+HHX/BVX/o0DV/8Aweab/wDJNH/Djr/gqr/0aBq//g803/5Jo9rV/mf3h7On2R5b/wAPA/29P+j3Pi9/4crVP/j9H/DwP9vT/o9z4vf+HK1T/wCP16l/w46/4Kq/9Ggav/4PNN/+SaP+HHX/AAVV/wCjQNX/APB5pv8A8k0e1q/zP7w9nT7I8t/4eB/t6f8AR7nxe/8ADlap/wDH6P8Ah4H+3p/0e58Xv/Dlap/8fr1L/hx1/wAFVf8Ao0DV/wDweab/APJNH/Djr/gqr/0aBq//AIPNN/8Akmj2tX+Z/eHs6fZHlv8Aw8D/AG9P+j3Pi9/4crVP/j9H/DwP9vT/AKPc+L3/AIcrVP8A4/XqX/Djr/gqr/0aBq//AIPNN/8Akmj/AIcdf8FVf+jQNX/8Hmm//JNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/wDDlap/8fo/4eB/t6f9HufF7/w5Wqf/AB+vUv8Ahx1/wVV/6NA1f/weab/8k0f8OOv+Cqv/AEaBq/8A4PNN/wDkmj2tX+Z/eHs6fZHlv/DwP9vT/o9z4vf+HK1T/wCP0f8ADwP9vT/o9z4vf+HK1T/4/XqX/Djr/gqr/wBGgav/AODzTf8A5Jo/4cdf8FVf+jQNX/8AB5pv/wAk0e1q/wAz+8PZ0+yPLf8Ah4H+3p/0e58Xv/Dlap/8fo/4eB/t6f8AR7nxe/8ADlap/wDH69S/4cdf8FVf+jQNX/8AB5pv/wAk0f8ADjr/AIKq/wDRoGr/APg803/5Jo9rV/mf3h7On2R5b/w8D/b0/wCj3Pi9/wCHK1T/AOP0f8PA/wBvT/o9z4vf+HK1T/4/XqX/AA46/wCCqv8A0aBq/wD4PNN/+SaP+HHX/BVX/o0DV/8Aweab/wDJNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/8OVqn/wAfo/4eB/t6f9HufF7/AMOVqn/x+vUv+HHX/BVX/o0DV/8Aweab/wDJNH/Djr/gqr/0aBq//g803/5Jo9rV/mf3h7On2R5b/wAPA/29P+j3Pi9/4crVP/j9H/DwP9vT/o9z4vf+HK1T/wCP16l/w46/4Kq/9Ggav/4PNN/+SaP+HHX/AAVV/wCjQNX/APB5pv8A8k0e1q/zP7w9nT7I8t/4eB/t6f8AR7nxe/8ADlap/wDH6P8Ah4H+3p/0e58Xv/Dlap/8fr1L/hx1/wAFVf8Ao0DV/wDweab/APJNH/Djr/gqr/0aBq//AIPNN/8Akmj2tX+Z/eHs6fZHlv8Aw8D/AG9P+j3Pi9/4crVP/j9H/DwP9vT/AKPc+L3/AIcrVP8A4/XqX/Djr/gqr/0aBq//AIPNN/8Akmj/AIcdf8FVf+jQNX/8Hmm//JNHtav8z+8PZ0+yPLf+Hgf7en/R7nxe/wDDlap/8fo/4eB/t6f9HufF7/w5Wqf/AB+vUv8Ahx1/wVV/6NA1f/weab/8k0f8OOv+Cqv/AEaBq/8A4PNN/wDkmj2tX+Z/eHs6fZHlv/DwP9vT/o9z4vf+HK1T/wCP0f8ADwP9vT/o9z4vf+HK1T/4/XqX/Djr/gqr/wBGgav/AODzTf8A5Jo/4cdf8FVf+jQNX/8AB5pv/wAk0e1q/wAz+8PZ0+yPLf8Ah4H+3p/0e58Xv/Dlap/8fob/AIKBft5sNrfttfF0g9QfiTqn/wAfr1L/AIcdf8FVf+jQNX/8Hmm//JNH/Djr/gqr/wBGgav/AODzTf8A5Jo9rV/mf3h7On2R8yarqmo+NNSuNb1e+lutXupmmu7m4kLyX0jElpGY8tKSSSTy5JP3vvfXH/Bv/wD8pWfhn/10v/8A0imrCH/BDr/gqsDkfsg6v/4PNN/+Sa+tv+CLv/BJj/goL8GP+CiXgT4vfGX9m7UtA0fSXu/7R1SfVLKVD5lrLGhKxTs+4uygkKQc5OCCTmWf1F+H/wDkC23/AFxX+VXKq6JE8Ok28UgwViUEfhVqgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbNDFOhjmQMp6giqR8L+H2O46RBk/9MxV+igCh/wAIt4e/6A9v/wB+xR/wi3h7/oD2/wD37FX6KAKH/CLeHv8AoD2//fsUf8It4e/6A9v/AN+xV+igCh/wi3h7/oD2/wD37FH/AAi3h7/oD2//AH7FX6KAKH/CLeHv+gPb/wDfsUf8It4e/wCgPb/9+xV+igCh/wAIt4e/6A9v/wB+xR/wi3h7/oD2/wD37FX6KAKH/CLeHv8AoD2//fsUf8It4e/6A9v/AN+xV+igCgPC/h4dNIt/+/Qo/wCEW8Pf9Ae3/wC/Yq/RQBQ/4Rbw9/0B7f8A79ij/hFvD3/QHt/+/Yq/RQBQ/wCEW8Pf9Ae3/wC/Yo/4Rbw9/wBAe3/79ir9FAFD/hFvD3/QHt/+/Yo/4Rbw9/0B7f8A79ir9FAFD/hFvD3/AEB7f/v2KP8AhFvD3/QHt/8Av2Kv0UAUP+EW8Pf9Ae3/AO/Yo/4Rbw9/0B7f/v2Kv0UAUP8AhFvD3/QHt/8Av2KP+EW8Pf8AQHt/+/Yq/RQBQ/4Rbw9/0B7f/v2KP+EW8Pf9Ae3/AO/Yq/RQBQ/4Rbw9/wBAe3/79ij/AIRbw9/0B7f/AL9ir9FAFD/hFvD3/QHt/wDv2KP+EW8Pf9Ae3/79ir9FAFD/AIRbw9/0B7f/AL9ij/hFvD3/AEB7f/v2Kv0UAUP+EW8Pf9Ae3/79ij/hFvD3/QHt/wDv2Kv0UAUP+EW8Pf8AQHt/+/Yo/wCEW8Pf9Ae3/wC/Yq/RQBQ/4Rbw9/0B7f8A79ij/hFvD3/QHt/+/Yq/RQBQ/wCEW8Pf9Ae3/wC/Yo/4Rbw9/wBAe3/79ir9FAFD/hFvD3/QHt/+/Yo/4Rbw9/0B7f8A79ir9FAFD/hFvD3/AEB7f/v2KP8AhFvD3/QHt/8Av2Kv0UAUP+EW8Pf9Ae3/AO/Yo/4Rbw9/0B7f/v2Kv0UAUP8AhFvD3/QHt/8Av2KP+EW8Pf8AQHt/+/Yq/RQBQ/4Rbw9/0B7f/v2KP+EW8Pf9Ae3/AO/Yq/RQBQ/4Rbw9/wBAe3/79ij/AIRbw9/0B7f/AL9ir9FAFD/hFvD3/QHt/wDv2KdB4e0S2cSQaZCjDoVjGau0UAAAAwKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z"
var gMc = null
var testObjTenant = {
  dataName : null,
  dataLevel : null,
  dataCategory : null,
  dataSpace : null,
  pinX : null,
  pinY : null,
  dataClock : null,
  dataPhone : null,
  dataDesc : null,
  imgPath : null,
}

var testArObjBuildingList = [
  [
    state = {
      dataFloor : 3,
      name : "虎の門"
    },
    [
      "子供服スイートキッズ", "1", "1", "1.08", "259", "188", "AF30012", "2005/10/3　～　2025/10/2", "162.4", "http"
    ],
    [
      "魚河岸大和", "1", "1", "1.01", "155", "273", "BF3123", "2015/1/3　～　2017/3/2", "132.00", "http"
    ],
    [
      "日本一", "1", "1", "1.02", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Smoothies & Soul", "1", "1", "1.03", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Seed of Life", "1", "1", "1.06", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Raw Delight", "1", "1", "1.07", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "Chipo", "2", "1", "2.01", "567", "143", "CHR34341", "2005/10/3　～　2025/10/2", "262.12", "http"
    ],

    [
      "ウニコ", "3", "1", "3.01", "358", "372", "GHR2323", "2013/10/3　～　2019/4/21", "122.55", "http"
    ],

    [
      "コクミンドラッグ", "2", "1", "2.06", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "富澤商店", "2", "2", "2.05", "847", "259", "GHR2323", "2015/10/3　～　2021/11/21", "182.4", "http"
    ],

    [
      "Folding Life", "3", '2', "3.03", null, null, , "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "日本橋OOO", "2", '2', null, null, "427", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "富澤商店", "2", '2', "2.03", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Enlightend Path", "3", '2', "3.02", null, null,
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "カフェバイザシー", "3", '4', "3.07", null, null, "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],

  // [
  // "マーコート", "8", '4', "8.03", "162", "394", "09:30AM — 19:00PM", "(01) 555-111",
  // "http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
  // ],
  // [
  // "サロン", "7", '4', "7.03", "265", "120", "09:30AM — 19:00PM", "(01) 555-111",
  // "http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
  // ],
  // [
  // "イエナ", "7", '4', "7.04", "406", "35", "09:30AM — 19:00PM", "(01) 555-111", "openセール"
  // ],
  // [
  // "ドレス", "7", '4', "7.05", "238", "429", "09:30AM — 19:00PM", "(01) 555-111", "openセール"
  // ],
  //
  // [
  // "ナノユニバース", "4", '2', "4.06", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
  // "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
  // ],
  //
  // [
  // "イエナ", "4", '2', "4.07", null, null, "10:00AM — 09:00PM", "(03) 123-3456",
  // "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
  // ],
  //
  // [
  // "Cold Soup Kitchen", "4", "1", "4.01", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
  // "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
  // ],
  //
  // [
  // "あメリカ", "4", '2', "4.02", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
  // "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
  // ],
  // [
  // "Little Artist", "4", '3', "4.03", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
  // "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
  // ],
  // [
  // "ビームス", "4", '4', "4.04", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
  // "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
  // ],
  ],

  [
    state = {
      dataFloor : 17,
      name : "森"
    },
    [
      "さわみつ青果", "1", "1", "1.08", "127", "261", "09:00AM — 17:00PM", "(03) XXX-XXX",
      "JCB DC UC VISA アメックス VIEW ダイナース 他", "http"
    ],
    [
      "魚河岸大和", "1", "1", "1.01", "158", "161", "09:30AM — 19:00PM", "(01) 555-111",
      "※クール商品は別途216円お客様負担となります。 税抜き200円 60センチ以内 それを超える場合税抜き￥300", "http"
    ],
    [
      "日本一", "1", "1", "1.02", "585", "461", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Smoothies & Soul", "1", "1", "1.09", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Seed of Life", "1", "1", "1.06", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Raw Delight", "1", "1", "1.07", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "Grilled Chipotle", "2", "1", "2.01", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "ウニコ", "3", "1", "3.01", "216", "388", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Cold Soup Kitchen", "4", "1", "4.01", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "コクミンドラッグ", "2", "1", "2.06", "184", "276", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "富澤商店", "2", "2", "2.05", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "ナノユニバース", "4", '2', "4.06", "43", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "イエナ", "4", '2', "4.07", "173", "187", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "Folding Life", "1", '2', "1.03", "693", "432", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "日本橋OOO", "2", '2', "2.02", "293", "427", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "富澤商店", "2", '2', "2.03", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Enlightend Path", "3", '2', "3.02", "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。",
      "http"
    ],
    [
      "ビームス", "4", '2', "4.02", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "Little Artist", "4", '3', "4.03", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "カフェバイザシー", "3", '4', "3.07", "593", "356", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "ビームス", "4", '4', "4.04", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "ガリャルダガランテ", "10", '4', "10.01", "173", "355", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "スタイリング", "10", '4', "10.02", "508", "462", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "アグ", "13", '4', "13.02", "446", "112", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "abcマート", "15", '4', "15.01", "446", "112", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "apartWeb", "14", '4', "14.01", "446", "112", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "スピック＆スバン", "31", '4', "31.01", "584", "363", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
    [
      "works＆applications", "17", '4', "17.01", "580", "89", "09:30AM — 19:00PM", "(01) 555-111",
      "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html", "http"
    ],
  ],

  [
    state = {
      dataFloor : 60,
      name : "アークタワー"
    },
    [
      "ark", "4", '1', "4.01", "143", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "ark", "2", '1', "4.02", "243", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "tt2", "3", '1', "4.03", "413", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Crazy Banana", "1", "1", "1.02", "43", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Smoothies & Soul", "1", "1", "1.09", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Seed of Life", "1", "1", "1.06", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Raw Delight", "1", "1", "1.07", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "Grilled Chipotle", "2", "1", "2.01", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "ウニコ", "3", "1", "3.01", "216", "388", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "Cold Soup Kitchen", "4", "1", "4.04", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "コクミンドラッグ", "2", "1", "2.06", "2.07", "183", "328", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],

    [
      "富澤商店", "2", "2", "2.05", "798", "386", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
    [
      "ナノユニバース", "4", '2', "4.06", "43", "221", "10:00AM — 09:00PM", "(03) 123-3456",
      "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。", "http"
    ],
  ],

]

// var testArObjTenantList = [
// testArObjBuildingList
// ]

// var setTestTotalBuilding = 4

var vArTenantList = []

wap.ac.ui.menu.MenuBuilding = function() {
  this.buildingBtnElement_ = null

  this.arLevelList = []

  this.arBuildingName = [
    "虎の門ビル", "森ビル", "アークタワー", "六本木ヒルズ", "アステリタワー", "虎の門ヒルズ", "森11ビル", "アークタワー", "六本木ヒルズ", "アステリタワー"
  ]
  this.arTenantList = []
  this.objTenant = {
    dataName : null,
    dataLevel : null,
    dataCategory : null,
    dataSpace : null,
    pinX : null,
    pinY : null,
    dataClock : null,
    dataPhone : null,
    dataDesc : null,

  }
};

wap.ac.ui.menu.MenuBuilding.prototype.testAddSvg = function(parentElement) {

  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  // svg.setAttribute("width", "98%");
  // svg.setAttribute("height", "97%");
  svg.setAttribute("class", "img--building");
  svg.setAttribute("viewBox", "0 0 640 480");
  svg.setAttribute("preserveAspectRatio", "none");

  parentElement.appendChild(svg);
  var vG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(vG);

  var img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttributeNS(null, "width", "100%");
  img.setAttributeNS(null, "height", "100%");
  img
      .setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          ("data:image/jpg;base64, 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"));
  vG.appendChild(img);

  // var vImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
  // vImage.setAttribute("width", 640);
  // vImage.setAttribute("height", 480);
  // vImage
  // .setAttribute(
  // "xlink:href",
  // "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAHgAoADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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");
  //
  // vG.appendChild(vImage);

  // var vTestRect = document.createElementNS('http://www.w3.org/2000/svg', "rect");
  //
  // vTestRect.setAttribute('x', '0')
  // vTestRect.setAttribute('y', '0')
  // vTestRect.setAttribute('width', '500')
  // vTestRect.setAttribute('height', '20')
  //
  // vG.appendChild(vTestRect);
}

wap.ac.ui.menu.MenuBuilding.prototype.testEditForm = function() {

  // alert("specialstam")
  var vThat = this
  titleElement = goog.dom.getElementByClass("panel-heading")

  if (titleElement) {
    titleElement.textContent = "商業施設一覧"
  }

  // setTimeout(function() {
  stateElement = goog.dom.getElementByClass("slick-column-name")
  if (stateElement) {
    stateElement.textContent = "状態"

    stateRow = goog.dom.getElementsByTagNameAndClass("div", "r0")

    if (stateRow[0]) {
      stateRow[2].textContent = "";
      var alertIcon = goog.dom.createDom('i', {
        'class' : 'fa fa-info-circle'
      });
      goog.dom.appendChild(stateRow[2], alertIcon);

      stateRow[4].textContent = "";

      // var alertIcon = goog.dom.createDom('i', {
      // 'class' : 'fa fa-info-circle'
      // });
      alertIcon = goog.dom.createDom('i', {
        'class' : 'fa fa-info-circle'
      });
      goog.dom.appendChild(stateRow[4], alertIcon);

      getParentBtn = goog.dom.getElementByClass("btn-toolbar")

      goog.events.listen(stateRow[2], goog.events.EventType.CLICK, goog.bind(function(e) {

        vThat.setBuildingFrame(testArObjBuildingList[0][0])
        vThat.setListCategory(testArObjBuildingList[0])
        vThat.setFloorBuilding(testArObjBuildingList[0][0].dataFloor)
        vThat.buildingControll(vThat.arTenantList, testArObjBuildingList[0][0].dataFloor)

        // 仮 スクロールバーの位置設定
        // document.body.scrollTop = 420

        // フレーム削除
        selectCompanyElement = goog.dom.getElementByClass("portal__select-company");
        selectCompanyElement.remove();

        selectCompanyElement2 = goog.dom.getElementByClass("portal__icon-menu");
        selectCompanyElement2.remove();
      }, this));
    }

    var vListBtn = new wap.ui.Button('一覧', wap.ui.Button.Type.PRIMARY);
    vListBtn.render(getParentBtn);

    var vMapBtn = new wap.ui.Button('map', wap.ui.Button.Type.PRIMARY);
    vMapBtn.render(getParentBtn);

    vListBtn.setOnClick(function() {

      vListBtn.setEnabled(!vListBtn.isEnabled());
    }, this);

    vMapBtn.setOnClick(function() {

      vMapBtn.setEnabled(!vMapBtn.isEnabled());

      vThat.setBuildingFrame(testArObjBuildingList[0][0])
      vThat.setListCategory(testArObjBuildingList[0])
      vThat.setFloorBuilding(testArObjBuildingList[0][0].dataFloor)
      vThat.buildingControll(vThat.arTenantList, testArObjBuildingList[0][0].dataFloor)

      // 仮 スクロールバーの位置設定
      // document.body.scrollTop = 420

      // フレーム削除
      selectCompanyElement = goog.dom.getElementByClass("portal__select-company");
      selectCompanyElement.remove();

      selectCompanyElement2 = goog.dom.getElementByClass("portal__icon-menu");
      selectCompanyElement2.remove();

    }, this);

  }

  // }, 2500);

}

wap.ac.ui.menu.MenuBuilding.prototype.setSelectBuildingIcon = function() {

  var vMax = 10;
  // var menuList = goog.dom.getElement('main-area');

  var menuListParent = goog.dom.getElement('main-area');
  var menuList = goog.dom.createDom('div', {
    'id' : 'portal_building',
    'class' : 'portal__menu'
  });

  goog.dom.appendChild(menuListParent, menuList);

  // ---- middle 会社選択
  var vMainMenuLeft = goog.dom.createDom('div', 'portal__select-company');
  var otherCompany = new wap.ac.re.gate.OtherCorpSelect();
  otherCompany.render(vMainMenuLeft);

  goog.dom.appendChild(menuList, vMainMenuLeft);

  // this.testEditForm()

  // this.testAddSvg(vMainMenuLeft)

  var vMainMenuBottom = goog.dom.createDom('div', 'portal__icon-menu');
  var vMainMenuArea = goog.dom.createDom('section', 'items-wrap');
  var src = "/company-cre-front/img/login/";
  for (var i = 0; i < vMax; ++i) {

    var vMenuItem = goog.dom.createDom('div', 'item');
    goog.dom.appendChild(vMainMenuArea, vMenuItem);

    var vItemImg = goog.dom.createDom('img', 'item_image');

    // var element = goog.dom.getElementsByTagNameAndClass('div', 'item_image');
    // goog.dom.setProperties(goog.dom.getElement(vItemImg), {
    // src : './image.png'
    // });
    goog.dom.appendChild(vMenuItem, vItemImg);

    goog.dom.setProperties(goog.dom.getElement(vItemImg), {
      src : src + i + ".jpg"
    });

    var vItemTitle = goog.dom.createDom('h2', 'item_title', this.arBuildingName[i]);
    goog.dom.appendChild(vMenuItem, vItemTitle);

  }

  goog.dom.appendChild(vMainMenuBottom, vMainMenuArea);
  goog.dom.appendChild(menuList, vMainMenuBottom);

  var itemElements = goog.dom.getElementsByTagNameAndClass("div", "item")
  var itemElement = [].slice.call(itemElements)

  var vThat = this
  var check = false

  itemElement.forEach(function(item, pos) {
    item.addEventListener('click', function() {

      if (pos < 3) {
        setTestTotalBuilding = testArObjBuildingList[pos][0].dataFloor

        if (check && setTestTotalBuilding) {
          var vBuildingElement = goog.dom.getElementByClass("portal__building")
          if (vBuildingElement) {
            vBuildingElement.remove();
          }
          vThat.init();
        }
        if (pos < 3) {

          vThat.setBuildingFrame(testArObjBuildingList[pos][0])
          vThat.setListCategory(testArObjBuildingList[pos])
          vThat.setFloorBuilding(setTestTotalBuilding)
          vThat.buildingControll(vThat.arTenantList, setTestTotalBuilding)

          // 仮 スクロールバーの位置設定
          document.body.scrollTop = 520;
          check = true;
        }
      } else {
        alert("まだデータ作成してない。")
      }

    });
  });

  // this.testAddSvg(vMainMenuLeft)

}

wap.ac.ui.menu.MenuBuilding.prototype.buildingTabEvent = function() {
  var vElement = goog.dom.getElement("sidebar-tab-bt_building")

  if (vElement) {
    this.setSelectBuildingIcon()

    this.buildingBtnElement_ = vElement

    var vTempCheck = goog.net.cookies.get("buildingOpenCount")

    if (vTempCheck == "null" || typeof (vTempCheck) == "undefined") {
    } else {
      this.buildingTabRender("init")
    }

    var vThat = this
    goog.events.listen(this.buildingBtnElement_, goog.events.EventType.CLICK, goog.bind(function(e) {
      vThat.buildingTabRender("click")
    }, this));
  }

}

wap.ac.ui.menu.MenuBuilding.prototype.setListShowBuildingFrame = function(parent) {

}

wap.ac.ui.menu.MenuBuilding.prototype.buildingControll = function(getList, totalBuildingMax) {

  console.log("building Logic")

  var vThat = this

  var vMainMenuLeft = goog.dom.getElementByClass("portal__select-company")

  // var buildingElement = [].slice.call(goog.dom.getElementsByTagNameAndClass("div", "level")
  isNavigating = false
  isExpanded = false
  isOpenContentArea = false
  isShowTenant = false
  isMotoHeightCheck = false
  motoTopHeight = null

  arViewBtn = [
    false, false, false
  ]

  mall = document.querySelector(".spaces__list--left")
  mallLevelsEl = mall.querySelector('.levels')
  mallLevels = [].slice.call(mallLevelsEl.querySelectorAll('.level'))
  mallTags = [].slice.call(mall.querySelectorAll(".level--tag"))

  setTranslateStyle()

  mallLevelsTotal = mallLevels.length,
  // surroundings elems
  mallSurroundings = [].slice.call(mall.querySelectorAll('.surroundings'))

  // 図の種類設定
  // var arMcList = [
  // ":2", ":3", ":4"
  // ]
  // var arMcElement = []
  // // イベント設定
  // for (var i = 0; i < arMcList.length; ++i) {
  // arMcElement.push(goog.dom.getElement(arMcList[i]))
  // }

  multiElement = goog.dom.getElementsByTagNameAndClass("li", "wap-multi-check-option")
  arMcElement = []
  for (var i = 0; i < multiElement.length; ++i) {
    // arMcElement.push(goog.dom.getElement(arMcList[i]))
    if (i == 0) {
      multiElement[i].childNodes[0].checked = true
    }
    arMcElement.push(multiElement[i].childNodes[0])
  }

  var src = "/company-cre-front/img/building/";

  checkMultiPos = 0

  // if (arMcElement[0] != null) {
  arMcElement.forEach(function(item, pos) {
    item.addEventListener('click', function() {
      gMc.clear()
      item.checked = true
      checkMultiPos = pos
      if (pos == 0) {
        // simple
        setImage("simple")
      } else if (pos == 1) {
        // floor
        setImage("floor")
      } else if (pos == 2) {
        // 図面
        setImage("drawing")
      } else if (pos == 3) {
        // 平面
        showPlane(3)
      }
    });
  });

  function setImage(selectedViewName) {
    var src = "/company-cre-front/img/building/";
    if (selectedViewName == "simple") {
      imgTempName = "map_"
    } else if (selectedViewName == "floor") {
      imgTempName = "map_floor_"
    } else if (selectedViewName == "drawing") {
      imgTempName = "map_drawing_"
    }

    for (var i = 1; i <= totalBuildingMax; ++i) {
      var imgTemp = goog.dom.getElement("imgBuilding-" + i)
      goog.dom.setProperties(imgTemp, {
        src : src + imgTempName + i + ".gif"
      });
    }
  }

  function setProfitImage(selectedLevel, selectdPeriod) {
    var src = "/company-cre-front/img/building/";
    var imgTempName = "map_profit_"
    var vColor = null
    if (selectdPeriod == 0) {
      vColor = ""
    } else if (selectdPeriod == 1) {
      vColor = "green_"
    } else if (selectdPeriod == 2) {
      vColor = "yellow_"
    } else if (selectdPeriod == 3) {
      vColor = "red_"
    }

    var imgTemp = goog.dom.getElement("imgBuilding-" + selectedLevel)
    goog.dom.setProperties(imgTemp, {
      src : src + imgTempName + vColor + 1 + ".gif"
    });
  }

  function setPeriodImage(selectedLevel, selectdPeriod) {
    var src = "/company-cre-front/img/building/";
    var imgTempName = "map_period_"
    var vColor = null

    if (selectdPeriod == 0) {
      vColor = ""
    } else if (selectdPeriod == 1) {
      vColor = "green_"
    } else if (selectdPeriod == 2) {
      vColor = "yellow_"
    } else if (selectdPeriod == 3) {
      vColor = "red_"
    } else {
      vColor = ""
    }

    var imgTemp = goog.dom.getElement("imgBuilding-" + selectedLevel)

    goog.dom.setProperties(imgTemp, {
      src : src + imgTempName + vColor + 1 + ".gif",
    });
    // goog.style.setStyle(imgTemp, {
    // "opacity" : "0.2",
    // });
    //
    // goog.style.setStyle(imgTemp, {
    // "-webkit-transition" : "opacity 12.8s ease-in-out",
    // "transition" : "opacity 12.8s ease-in-out",
    // "opacity" : "0.9",
    // });
    // -webkit-transition: opacity 0.8s;
    // transition: opacity 0.8s;

  }

  var testTitleClickEvent = goog.dom.getElement("building-title")

  testTitleClickEvent.addEventListener('click', function() {

    alert("click")
    // ①level 隠す levelの
    var vGetLevels = goog.dom.getElementByClass("levels")
    goog.style.setStyle(vGetLevels, {
      '-webkit-transform' : '!important',
      '-transform' : '',
    });

    // ②sizeの量をもう一回frameを生成
    vThat.setListShowBuildingFrame()

    // ③Level-1 中身frameに結合
  });
  // ビルクリックイベント
  mallLevels.forEach(function(level, pos) {
    level.addEventListener('click', function() {

      if (isExpanded) {
        // 座標表示
        var offX = event.offsetX;
        var offY = event.offsetY;
        console.log("X座標：" + offX + ", Y座標：" + offY);
      }
      showLevel(pos + 1)
      //
    });
  });

  pinElements = [].slice.call(goog.dom.getElementsByTagNameAndClass("span", "level__pins--title"))
  pinElements.forEach(function(pin, pos) {
    pin.addEventListener('click', function() {
      // alert("click" + pin.id)
      // クリックしたテナント情報を表示
      showTenant(pin.id)
    });
  });

  viewFormEl = goog.dom.getElementByClass("view__form")
  viewPeriodEl = goog.dom.getElementByClass("view__period")
  viewPeriodBtn = [].slice.call(viewPeriodEl.childNodes)

  prePos = null
  viewBtnElements = [].slice.call(goog.dom.getElementsByTagNameAndClass("li", "selected"))
  viewBtnElements.forEach(function(viewBtn, pos) {
    viewBtn.addEventListener('click', function() {
      if (pos == 0) {
        // 面積
        initAll()
        viewBtnOff()
        viewBtn.classList.add('on');

        viewArea()

      } else if (pos == 1) {
        // 売上
        initAll()
        viewBtnOff()
        viewBtn.classList.add('on');
        viewProfit()

        var vGetElement = goog.dom.getElementByClass("view__period--green")
        goog.style.setStyle(vGetElement, {
          'background-color' : '#33b3ed',
        });

        vGetElement = goog.dom.getElementByClass("view__period--allg")
        goog.style.setStyle(vGetElement, {
          'background-color' : '#85cbeb',
        });

      } else if (pos == 2 && prePos != pos) {
        // 契約期間
        initAll()
        viewBtnOff()
        viewBtn.classList.add('on');
        viewPeriod()

        var vGetElement = goog.dom.getElementByClass("view__period--green")
        goog.style.setStyle(vGetElement, {
          'background-color' : '#04833d',
        });

        vGetElement = goog.dom.getElementByClass("view__period--allg")
        goog.style.setStyle(vGetElement, {
          'background-color' : '#8ff3bc',
        });

      } else if (pos == 3) {
        // 図面
        initAll()
        viewBtnOff()
        viewBtn.classList.add('on');
        viewDrawing()
      } else if (pos == 4) {
        alert("heimen")
      }
      prePos = pos

    });
  });
  // period,profit関連
  viewPeriodBtn.forEach(function(viewBtn, pos) {
    viewBtn.addEventListener('click', function() {

      if (prePos == 0) {
      } else if (prePos == 1) {
        setProfitImage(selectedLevel, pos)
      } else if (prePos == 2) {
        setPeriodImage(selectedLevel, pos)
      }

      // // 10年
      // alert("10年:and-floor:" + selectedLevel)
      //
      // } else if (pos == 1) {
      // // 5~10年
      // alert("5~10年:and-floor:" + selectedLevel)
      //
      // } else if (pos == 2) {
      // // 2~5年
      // alert("2~5年:and-floor:" + selectedLevel)
      // // setImage("simple")
      // setPeriodImage(selectedLevel, pos)
      //
      // }
    });
  });

  mallNav = document.querySelector('.mallnav')

  allLevelsCtrl = mallNav.querySelector('.mallnav__button--all-levels')
  levelUpCtrl = mallNav.querySelector('.mallnav__button--up')
  levelDownCtrl = mallNav.querySelector('.mallnav__button--down')

  // spaces list element
  spacesListEl = document.getElementById('spaces-list')
  // spaces list ul
  spacesEl = spacesListEl.querySelector('ul.list')
  // all the spaces listed
  spaces = [].slice.call(spacesEl.querySelectorAll('.list__item > span.list__link'))

  preLevel = []

  vArIncreaseSecond = []

  spacesList = null
  spacesList = new List('spaces-list', {
    valueNames : [
      'list__link', {
        data : [
          'level'
        ]
      }, {
        data : [
          'category'
        ]
      }
    ]
  })

  sortByLevelCtrl = document.querySelector('#sort-by-level')
  sortByNameCtrl = document.querySelector('#sort-by-name')
  sortByCategoryCtrl = document.querySelector('#sort-by-category')

  sortByCategoryCtrl.checked = true

  sortByLevelCtrl.addEventListener('click', function() {

    if (this.checked) {
      spacesEl.classList.remove('grouped-by-category');
      spacesEl.classList.remove('grouped-by-name');

      spacesEl.classList.add('grouped-by-level');
      spacesList.sort('level');
      sortByNameCtrl.checked = false
      sortByCategoryCtrl.checked = false

      var vLevelList = goog.dom.getElementsByTagNameAndClass("li", "list__item")

      var vPreLevel = 0
      for (var i = 0; i < vLevelList.length; ++i) {
        if (vPreLevel != vLevelList[i].dataset.level) {
          vPreLevel = vLevelList[i].dataset.level
          var vLevelFrame = goog.dom.createDom('div', {
            'class' : 'level__sort--frame',
          }, "Level" + vLevelList[i].dataset.level);
          goog.dom.insertSiblingBefore(vLevelFrame, vLevelList[i])
        }
      }

    } else {
      spacesEl.classList.add('grouped-by-category');
      spacesList.sort('category');
    }

  });

  sortByNameCtrl.addEventListener('click', function() {

    if (this.checked) {
      spacesEl.classList.remove('grouped-by-category');
      spacesEl.classList.remove('grouped-by-level');
      spacesEl.classList.add('grouped-by-name');
      spacesList.sort('list__link');

      sortByLevelCtrl.checked = false
      sortByCategoryCtrl.checked = false
      // var vNameList = goog.dom.getElementsByTagNameAndClass("li", "list__item")
      // var vPreName = 0
      // //
      // for (var i = 0; i < vNameList.length; ++i) {
      // if (vPreName != vNameList[i].dataset.name) {
      // vPreName = vNameList[i].dataset.name
      // var vNameFrame = goog.dom.createDom('div', {
      // 'class' : 'level__sort--frame',
      // }, vNameList[i].dataset.name[0]);
      // goog.dom.insertSiblingBefore(vNameFrame, vNameList[i])
      // }
      // }

    } else {
      spacesEl.classList.add('grouped-by-category');
      spacesList.sort('category');
    }

  });

  function initAll() {

    viewPeriodEl.classList.add('view--hidden')

    var rangeElement = goog.dom.getElement("range")
    if (rangeElement) {
      rangeElement.remove()
    }

    mallLevels[selectedLevel - 1].classList.remove('level__profit--add')

    // alert(checkMultiPos)

    if (checkMultiPos == 0) {
      setImage("simple")
    } else if (checkMultiPos == 0) {
      setImage("floor")
    } else if (checkMultiPos == 0) {
      setImage("drawing")
    }

  }

  function timestamp(str) {
    return new Date(str).getTime();
  }

  sortByCategoryCtrl.addEventListener('click', function() {

    if (this.checked) { // spacesEl.classList.remove('grouped-by-category');
      spacesEl.classList.remove('grouped-by-level');
      spacesEl.classList.remove('grouped-by-name');

      spacesEl.classList.add('grouped-by-category');

      sortByLevelCtrl.checked = false
      sortByNameCtrl.checked = false

      spacesList.sort('category');
    } else {
      spacesEl.classList.remove('grouped-by-category');
      spacesList.sort('level');
    }

  });

  // clicking on a listed space: open level - shows space
  spaces.forEach(function(space) {
    var spaceItem = space.parentNode, level = spaceItem.getAttribute('data-level'), spacerefval = spaceItem
        .getAttribute('data-space');

    space.addEventListener('click', function(ev) {
      isExpanded = false
      ev.preventDefault();
      closeSearch();
      showLevel(level);

      if (preLevel[preLevel.length - 1] != preLevel[preLevel.length - 2] && preLevel.length > 1) {
        // 現在位置を変更
        var delPos = preLevel[preLevel.length - 2] - 1
        mallLevels[delPos].classList.remove('level--current')
        mallLevels[delPos].classList.remove('level__profit--add')

        viewBtnOff()
        initAll()

      }
      showTenant(spacerefval)
    });
  });

  levelUpCtrl.addEventListener('click', function() {
    navigate('Down');
  });
  levelDownCtrl.addEventListener('click', function() {
    navigate('Up');
  });

  allLevelsCtrl.addEventListener('click', function() {
    // shows all levels
    showAllLevels();
    hidePin();

    isExpanded = false;

    gMc.clear();
  });

  // viewBtnOffさせよう
  function viewBtnOff() {
    for (var i = 0; i < viewBtnElements.length; ++i) {
      viewBtnElements[i].classList.remove('on')
    }
  }

  // 売上
  function viewProfit() {
    console.log("売上")
    mallLevels[selectedLevel - 1].classList.add('level__profit--add')

    // div枠設定
    // var vRangeFrame = goog.dom.createDom('div', {
    // 'id' : 'range',
    // 'class' : 'noUi-target noUi-rtl noUi-vertical noUi-background'
    // });
    //
    // var parentFrame = goog.dom.getElement("spaces-list-left")
    // goog.dom.appendChild(parentFrame, vRangeFrame);
    //
    // noUiSlider.create(range, {
    // start : [
    // 20, 80
    // ], // Handle start position
    // step : 10, // Slider moves in increments of '10'
    // margin : 20, // Handles must be more than '20' apart
    // connect : true, // Display a colored bar between the handles
    // direction : 'rtl', // Put '0' at the bottom of the slider
    // orientation : 'vertical', // Orient the slider vertically
    // behaviour : 'tap-drag', // Move handle on tap, bar is draggable
    // range : { // Slider can select '0' to '100'
    // 'min' : 0,
    // 'max' : 100
    // },
    // pips : { // Show a scale with the slider
    // mode : 'steps',
    // density : 2
    // }
    // });

    // spaces-list-left
    // <div id="range" class="noUi-target noUi-rtl noUi-vertical noUi-background">
    viewPeriodEl.classList.remove('view--hidden')

    var vProfitElement = goog.dom.getElementsByTagNameAndClass("span", "view__text")
    var vSetText = null

    if (vProfitElement) {
      for (var i = 0; i < vProfitElement.length; ++i) {
        if (i == 0) {
          vSetText = "全体"
        } else if (i == 1) {
          vSetText = "100%以上"
        } else if (i == 2) {
          vSetText = "80~90%"
        } else if (i == 3) {
          vSetText = "80%以下"
        }
        vProfitElement[i].textContent = vSetText
      }
    }

    setProfitImage(selectedLevel, 0)
    gMc.clear()

  }

  // 図面
  function viewDrawing() {
    console.log("図面")
  }

  // 面積
  function viewArea() {
    console.log("面積")
    gMc.clear()
    multiElement = goog.dom.getElementsByTagNameAndClass("li", "wap-multi-check-option")
    multiElement[2].childNodes[0].checked = true

    setImage("drawing")
  }
  // 契約期間
  function viewPeriod(btnPos) {
    console.log("契約期間")
    viewPeriodEl.classList.remove('view--hidden')

    setPeriodImage(selectedLevel, "default")
    gMc.clear()

    var vPeriodElement = goog.dom.getElementsByTagNameAndClass("span", "view__text")

    var vSetText = null
    for (var i = 0; i < vPeriodElement.length; ++i) {
      if (i == 0) {
        vSetText = "全体"
      } else if (i == 1) {
        vSetText = "10年以上"
      } else if (i == 2) {
        vSetText = "5年~10年"
      } else if (i == 3) {
        vSetText = "2年~5年"
      }
      vPeriodElement[i].textContent = vSetText
    }

    if (btnPos == 0) {
    } else if (btnPos == 1) {
    } else if (btnPos == 2) {
    }

  }

  function closeSearch() {
    spacesListEl.classList.remove('spaces-list--open');
    // containerEl.classList.remove('container--overflow');
  }

  function openSearch() {
    // shows all levels - we want to show all the spaces for smaller screens
    showAllLevels();

    classie.add(spacesListEl, 'spaces-list--open');
    classie.add(containerEl, 'container--overflow');
  }

  /**
   * Shows all Mall´s levels
   */
  function showAllLevels() {
    console.log("showAllLevels")
    if (isNavigating || !isExpanded) {
      // return false;
    }

    prePos = null
    var vIncreaseSec = 0.00001
    var vStatciTempIncreaseSec = 0.00001
    for (var i = 0; i < mallLevels.length; ++i) {
      vIncreaseSec += vStatciTempIncreaseSec
      goog.style.setStyle(mallLevels[i], {
        "-webkit-transition-delay" : vIncreaseSec + "s",
        "transition-delay" : vIncreaseSec + "s"
      });
    }

    isExpanded = false;

    setTranslateStyle()
    resetLevelTagStyle()

    mallLevels[selectedLevel - 1].classList.remove('level--current')
    mallLevels[selectedLevel - 1].classList.remove('level__profit--add')
    viewBtnOff();
    initAll();
    mallLevels[selectedLevel - 1].classList.add('level--bg')
    // mallLevelsEl.classList.remove('levels--selected-' + selectedLevel)
    mallLevelsEl.classList = "levels levels__transform"
    mallLevelsEl.classList.remove('levels--open');

    hideMallNav();
    showSurroundings();

    getElement = goog.dom.getElement("3d-level");
    getElement.classList.add('levels__transform');

    mallLevels[0].classList.remove("show__plane--1");
    mallLevels[1].classList.remove("show__plane--2");
    mallLevels[2].classList.remove("show__plane--3");

    setTopScroll()

    // isNavigating = false

    if (isOpenContentArea) {
      removeContentArea();
      isOpenContentArea = false
      // isShowTenant = false
    }

  }

  function setDelay(level) {

    var vStaticIncreaseSecond = null
    var vIncreaseSecond = null
    vArIncreaseSecond = []
    var vStaticSelectSec = null

    if (mallLevels.length < 10) {
      vStaticIncreaseSecond = 0.10
      vStaticSelectSec = 0.0025
    } else if (mallLevels.length < 15) {
      vStaticIncreaseSecond = 0.075
      vStaticSelectSec = 0.0095
    } else if (mallLevels.length < 20) {
      vStaticIncreaseSecond = 0.075
      vStaticSelectSec = 0.0095
    } else if (mallLevels.length < 30) {
      vStaticIncreaseSecond = 0.035
      vStaticSelectSec = 0.0085
    } else if (mallLevels.length < 40) {
      vStaticIncreaseSecond = 0.050
      vStaticSelectSec = 0.0095
    } else if (mallLevels.length < 50) {
      vStaticIncreaseSecond = 0.035
      vStaticSelectSec = 0.0095
    } else if (mallLevels.length < 60) {
      vStaticIncreaseSecond = 0.028
      vStaticSelectSec = 0.0085
    } else if (mallLevels.length < 70) {
      vStaticIncreaseSecond = 0.025
      vStaticSelectSec = 0.0085
    } else {
      vStaticIncreaseSecond += 0.01
    }

    for (var i = 0; i < mallLevels.length; ++i) {
      if (i > level) {
        vStaticIncreaseSecond += vStaticSelectSec
      }
      vIncreaseSecond += vStaticIncreaseSecond
      vArIncreaseSecond.push(vIncreaseSecond)
    }

    for (var i = 0; i < mallLevels.length; ++i) {
      goog.style.setStyle(mallLevels[i], {
        "-webkit-transition-delay" : vArIncreaseSecond[i] + "s",
        "transition-delay" : vArIncreaseSecond[i] + "s"
      });
    }

  }

  function resetTopScroll(level) {
    buildingFrame = goog.dom.getElement("spaces-list-left")
    if (buildingFrame) {
      if (!isNavigating && !isMotoHeightCheck) {
        motoTopHeight = buildingFrame.style.minHeight
      }

      isMotoHeightCheck = true

      var iCheckIncrease = 0
      if (mallLevels.length < 10) {
        iCheckIncrease = 1.0
      } else if (mallLevels.length < 20) {
        iCheckIncrease = 1.2
      } else if (mallLevels.length < 30) {
        iCheckIncrease = 1.3
      } else if (mallLevels.length < 40) {
        iCheckIncrease = 2.0
      } else if (mallLevels.length < 50) {
        iCheckIncrease = 2.0
      } else if (mallLevels.length < 60) {
        iCheckIncrease = 2.0
      } else if (mallLevels.length < 70) {
        iCheckIncrease = 2.0
      } else {
        iCheckIncrease = 3.0
      }

      if (mallLevels.length / 2 < level) {
        // iCheckIncrease = 1.5
      } else {
        iCheckIncrease = 1.0
      }

      setTimeout(function() {
        buildingFrame.style.minHeight = 100 + "vh" + ""

        for (var i = 0; i < mallLevels.length; ++i) {
          mallLevels[i].classList.add('level--delay')
        }
      }, (iCheckIncrease) * 1000);

    }

  }

  function setTopScroll() {
    buildingFrame = goog.dom.getElement("spaces-list-left")

    if (buildingFrame) {
      buildingFrame.style.minHeight = motoTopHeight

      for (var i = 0; i < mallLevels.length; ++i) {
        mallLevels[i].classList.remove('level--delay')
      }
    }

  }

  function showPin() {
    var getElements = goog.dom.getElementsByTagNameAndClass("span", "level__pins--title")

    for (i = 0; i < getElements.length; ++i) {
      getElements[i].style.display = ""
    }

  }
  function hidePin() {
    var getElements = goog.dom.getElementsByTagNameAndClass("span", "level__pins--title")

    for (i = 0; i < getElements.length; ++i) {
      getElements[i].style.display = "none"
    }
  }

  function showPlane(level) {

    if (isExpanded) {
      return false;
    }

    selectedLevel = level;

    setDelay(level);

    // frameで設定してるtranslateをリセット
    resetTranslateStyle()
    // tag位置修正
    setLevelTagStyle()

    // navigation コントロール
    setNavigationState();

    mallLevelsEl.classList.add('levels--selected-' + selectedLevel)

    var levelEl = mallLevels[selectedLevel - 1];
    // levelEl.classList.add('level--current');
    vSetHeight = -1710
    vAddSetHeight = 0

    getElement = goog.dom.getElement("3d-level")
    getElement.classList.remove('levels__transform');
    for (var i = 0; i < mallLevels.length; ++i) {
      mallLevels[i].classList.remove('level--current');
      // if (level - 1 > i) {

      mallLevels[i].classList.add("show__plane--" + (i + 1))

      // vSetHeightResult = vSetHeight + vAddSetHeight
      goog.style.setStyle(mallLevels[i], {
        "background" : "none",
      // "margin-top" : vSetHeightResult + "px"
      //
      // // "-webkit-transform" : "rotateX(-90deg) rotateY(-44deg) translateZ(" + vSetHeightResult + "vmin)",
      // // "transform" : "rotateX(-90deg) rotateY(-44deg) translateZ(" + vSetHeightResult + "vmin)"
      });
      // vAddSetHeight = vAddSetHeight + 450
      //
      // // }

    }

    hideSurroundings();
    // // show mall nav ctrls
    showMallNav();

    showPin();

    // resetTopScroll(level);

    preLevel.push(Number(level));

    isExpanded = true;

    buildingFrame.style.minHeight = 200 + "vh" + ""

  }

  function showLevel(level) {

    if (isExpanded) {
      return false;
    }

    selectedLevel = level;

    setDelay(level)

    // frameで設定してるtranslateをリセット
    resetTranslateStyle()
    // tag位置修正
    setLevelTagStyle()

    // navigation コントロール
    setNavigationState();

    mallLevelsEl.classList.add('levels--selected-' + selectedLevel)

    var levelEl = mallLevels[selectedLevel - 1];
    levelEl.classList.add('level--current');
    for (var i = 0; i < mallLevels.length; ++i) {

      if (level - 1 > i) {
        goog.style.setStyle(mallLevels[i], {
          "-webkit-transform" : "translateZ(-70vmin)",
          "transform" : "translateZ(-70vmin)"
        });
      }

    }

    hideSurroundings()
    // // show mall nav ctrls
    showMallNav()

    showPin()

    resetTopScroll(level)

    preLevel.push(Number(level))

    isExpanded = true

  }

  function setLevelTagStyle() {

    for (var i = 0; i < mallTags.length; ++i) {
      goog.style.setStyle(mallTags[i], {
        "-webkit-transform" : "translateY(12vmin)",
        "-transform" : "translateY(12vmin)"
      });
    }
  }

  function resetLevelTagStyle() {
    for (var i = 0; i < mallTags.length; ++i) {
      goog.style.setStyle(mallTags[i], {
        "-webkit-transform" : "",
        "transform" : ""
      });
    }
  }

  function setTranslateStyle() {
    for (var i = 0; i < mallLevels.length; ++i) {
      // if (i > 0) {
      var vIncrease = 10 * (i)
      goog.style.setStyle(mallLevels[i], {
        "-webkit-transform" : "translateZ(" + vIncrease + "vmin)",
        "transform" : "translateZ(" + vIncrease + "vmin)"
      });
    }
    // }
  }

  function resetTranslateStyle() {
    for (var i = 0; i < mallLevels.length; ++i) {
      goog.style.setStyle(mallLevels[i], {
        "-webkit-transform" : "",
        "transform" : ""
      });
    }
  }

  function setNavigationState() {
    if (selectedLevel == 1) {
      levelDownCtrl.classList.add('boxbutton--disabled');
    } else {
      levelDownCtrl.classList.remove('boxbutton--disabled');
    }

    if (selectedLevel == mallLevelsTotal) {
      levelUpCtrl.classList.add('boxbutton--disabled');
    } else {
      levelUpCtrl.classList.remove('boxbutton--disabled');
    }
  }

  function navigate(direction) {
    isNavigating = true;
    isUpBtnCheck = false;
    prePos = null

    var prevSelectedLevel = selectedLevel;

    // current level
    var currentLevel = mallLevels[prevSelectedLevel - 1];

    if (direction === 'Up' && prevSelectedLevel > 1) {
      --selectedLevel;

    } else if (direction === 'Down' && prevSelectedLevel < mallLevelsTotal) {
      ++selectedLevel;
      isUpBtnCheck = true
    } else {
      // isNavigating = false;
      return false;
    }
    preLevel.push(selectedLevel)
    setNavigationState();

    currentLevel.classList.add('level--moveOut' + direction);
    var nextLevel = mallLevels[selectedLevel - 1]
    nextLevel.classList.add('level--current');

    goog.style.setStyle(nextLevel, {
      "-webkit-transform" : "",
      "transform" : ""
    });

    if (isUpBtnCheck) {
      goog.style.setStyle(currentLevel, {
        "-webkit-transform" : "translateZ(-70vmin)",
        "transform" : "translateZ(-70vmin)"
      });
    }

    currentLevel.classList.remove('level--moveOut' + direction);
    setTimeout(function() {
      currentLevel.classList.remove('level--current');
      currentLevel.classList.remove('level__profit--add');
      viewBtnOff()
      initAll()

    }, 60);

    mallLevelsEl.classList.remove('levels--selected-' + prevSelectedLevel);
    mallLevelsEl.classList.add('levels--selected-' + selectedLevel);

    // isNavigating = false;

    // // when the transition ends..
    // onEndTransition(currentLevel, function() {
    // currentLevel.classList.remove('level--moveOut' + direction);
    // // solves rendering bug for the SVG opacity-fill property
    // setTimeout(function() {
    // currentLevel.classList.remove('level--current');
    // }, 60);
    //
    // mallLevelsEl.classList.remove('levels--selected-' + prevSelectedLevel);
    // mallLevelsEl.classList.add('levels--selected-' + selectedLevel);
    //
    // // show the current level´s pins
    // // showPins();
    //
    // isNavigating = false;
    // });

    // filter the spaces for this level
    // showLevelSpaces();
  }

  function showTenant(dataSpace) {

    removeContentArea()

    // isShowTenant = true
    // if (!isOpenContentArea) {
    // alert(this.arTenantList.length)
    var currentLevel = null
    var vTitle = null
    var vClock = null
    var vPhone = null
    var vDesc = null
    for (var i = 0; i < getList.length; ++i) {
      if (getList[i].dataSpace == dataSpace) {

        currentLevel = getList[i].dataLevel
        // alert("level:" + getList[i].dataLevel + "//tenantName:" + getList[i].dataName)
        vTitle = getList[i].dataName
        vClock = getList[i].dataClock
        vPhone = getList[i].dataPhone
        vDesc = getList[i].dataDesc

        vTenantFrame = goog.dom.createDom('div', {
          'class' : 'content__item content__item--hover content__item--current',
          "data-category" : getList[i].dataCategory,
          "data-space" : getList[i].dataSpace
        });

      }

    }

    var getParent = goog.dom.getElement("spaces-list-left")
    goog.dom.appendChild(getParent, vTenantFrame);

    // closeBtn設定
    vTenantBtn = goog.dom.createDom('div', {
      'class' : 'boxbutton boxbutton--dark content__button fa fa-times',
    });

    goog.dom.appendChild(vTenantFrame, vTenantBtn);

    goog.events.listen(vTenantBtn, goog.events.EventType.CLICK, goog.bind(function(e) {
      removeContentArea()
      closeContentArea()
    }, this));

    openContentArea()

    vTenantTitle = goog.dom.createDom('h3', {
      'class' : 'content__item-title',
    }, vTitle);

    goog.dom.appendChild(vTenantFrame, vTenantTitle);
    // ここから仮 start
    vTenantItemDetails = goog.dom.createDom('div', {
      'class' : 'content__item-details',
    });

    goog.dom.appendChild(vTenantFrame, vTenantItemDetails);

    vTenantItemContent = goog.dom.createDom('div', {
      'class' : 'content__meta',
    });

    goog.dom.appendChild(vTenantItemDetails, vTenantItemContent);

    // table 追加
    vTableType = goog.dom.createDom('table', {
      'class' : 'tbl_type',
    });

    goog.dom.appendChild(vTenantItemContent, vTableType);

    vColGroup = goog.dom.createDom('colgroup', {
    /* 'width' : '20%', */
    });

    goog.dom.appendChild(vTableType, vColGroup);

    vCol = goog.dom.createDom('col', {
      'width' : '20%'
    });

    goog.dom.appendChild(vColGroup, vCol);

    vThread = goog.dom.createDom('thead', {});

    goog.dom.appendChild(vTableType, vThread);

    vTr = goog.dom.createDom('tr', {});

    goog.dom.appendChild(vThread, vTr);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, "貸室番号");

    goog.dom.appendChild(vTr, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, vClock);

    goog.dom.appendChild(vTr, vTh);

    vTr = goog.dom.createDom('tr', {});
    goog.dom.appendChild(vThread, vTr);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, "契約期間");

    goog.dom.appendChild(vTr, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, vPhone);

    goog.dom.appendChild(vTr, vTh);

    vTr = goog.dom.createDom('tr', {});
    goog.dom.appendChild(vThread, vTr);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, "契約面積（m2)");

    goog.dom.appendChild(vTr, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col'
    }, vDesc + "(m2)");

    goog.dom.appendChild(vTr, vTh);

    // table2 追加
    vTableType = goog.dom.createDom('table', {
      'class' : 'table',
    });

    goog.dom.appendChild(vTenantItemContent, vTableType);

    vTable = goog.dom.createDom('table', {
    // 'class' : 'table',
    });

    goog.dom.appendChild(vTableType, vTable);

    vCaption = goog.dom.createDom('caption', {
    // 'class' : 'table',
    }, "賃料条件");

    goog.dom.appendChild(vTable, vCaption);

    vThread = goog.dom.createDom('thead', {
    // 'class' : 'table',
    });
    goog.dom.appendChild(vTable, vThread);

    vTr = goog.dom.createDom('tr', {
    // 'class' : 'table',
    });
    goog.dom.appendChild(vThread, vTr);

    vTh = goog.dom.createDom('th', {
      'colspan' : '1',
      'scope' : 'colgroup',
    }, "計算パターン名");

    goog.dom.appendChild(vThread, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col',
    }, "賃料歩率範囲");

    goog.dom.appendChild(vThread, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'col',
    }, "歩率(%)");

    goog.dom.appendChild(vThread, vTh);

    vTbody = goog.dom.createDom('tbody', {
    // 'scope' : 'col',
    });

    goog.dom.appendChild(vTable, vTbody);

    vTr = goog.dom.createDom('tr', {
    // 'class' : 'table',
    });
    goog.dom.appendChild(vTbody, vTr);

    vTh = goog.dom.createDom('th', {
      'rowspan' : '3',
      'scope' : 'rowgroup',
    }, "売上低減+最低保証");

    goog.dom.appendChild(vTr, vTh);

    vTh = goog.dom.createDom('th', {
      'scope' : 'row',
    }, "0～10000000");

    goog.dom.appendChild(vTr, vTh);

    vTd = goog.dom.createDom('td', {
    // 'scope' : 'row',
    }, "10");

    goog.dom.appendChild(vTr, vTd);

    vTr = goog.dom.createDom('tr', {
    // 'class' : 'table',
    });
    goog.dom.appendChild(vTbody, vTr);

    vTh = goog.dom.createDom('th', {
      'scope' : 'row',
    }, "10000000～12000000");

    goog.dom.appendChild(vTr, vTh);

    vTd = goog.dom.createDom('td', {
    // 'scope' : 'row',
    }, "8");

    goog.dom.appendChild(vTr, vTd);

    vTr = goog.dom.createDom('tr', {
    // 'class' : 'table',
    });
    goog.dom.appendChild(vTbody, vTr);

    vTh = goog.dom.createDom('th', {
      'scope' : 'row',
    }, "12000000～");

    goog.dom.appendChild(vTr, vTh);

    vTd = goog.dom.createDom('td', {
    // 'scope' : 'row',
    }, "7");

    goog.dom.appendChild(vTr, vTd);

    // table2 end

    // link

    vDetailLink = goog.dom.createDom('a', {
      // 'scope' : 'row',
      'href' : '/company-cre-front/ac/re/rc/contractlist/index',
      // 'href' :
      // "/company-cre-front/ac/component/sch/sch/goDetail?link=%2Fac%2Fre%2Frc%2Fref%2Faltref%2Findex%3FaltId%3D%7B1%7D&schId=AC_RE_RC_CONTRACT_LIST&key1=3432343b&key2=3433363b",

      "class" : "detail__link"
    }, "詳細情報");

    goog.dom.appendChild(vTenantFrame, vDetailLink);

    // <a href="/company-cre-front/ac/re/rc/contractlist/index">賃貸契約一覧</a>

    // vTenantItemStrong1 = goog.dom.createDom('strong', {}, "Opening Hours:");
    // goog.dom.appendChild(vTenantItemContent, vTenantItemStrong1);
    //
    // vTenantItem1 = goog.dom.createDom('span', {
    // 'class' : 'content__meta-item',
    // }, vClock);
    //
    // goog.dom.appendChild(vTenantItemContent, vTenantItem1);
    //
    // vTenantItemStrong2 = goog.dom.createDom('strong', {}, "Phone:");
    // goog.dom.appendChild(vTenantItemContent, vTenantItemStrong2);
    //
    // vTenantItem2 = goog.dom.createDom('span', {
    // 'class' : 'content__meta-item',
    // }, vPhone);
    //
    // goog.dom.appendChild(vTenantItemContent, vTenantItem2);
    //
    // vTenantContentDesc = goog.dom.createDom('p', {
    // 'class' : 'content__desc',
    // }, vDesc);
    //
    // goog.dom.appendChild(vTenantItemDetails, vTenantContentDesc);

    // ここから仮 end
  }

  function openContentArea() {
    isOpenContentArea = true;
    // shows space
    // showSpace(true);
    // show close ctrl
    // contentCloseCtrl.classList.remove('content__button--hidden');
    // resize mall area
    // mall.classList.add('mall--content-open');
    // disable mall nav ctrls
    levelDownCtrl.classList.add('boxbutton--disabled');
    levelUpCtrl.classList.add('boxbutton--disabled');
  }

  function closeContentArea() {
    isOpenContentArea = false;

    setNavigationState()
    // levelDownCtrl.classList.remove('boxbutton--disabled');
    // levelUpCtrl.classList.remove('boxbutton--disabled');
  }

  function removeContentArea() {

    var vContentFrame = goog.dom.getElementsByClass("content__item")
    if (vContentFrame.length > 0) {
      for (var i = 0; i < vContentFrame.length; ++i) {
        vContentFrame[i].remove()
      }
    }

  }

  function showLevelSpaces() {
    spacesList.filter(function(item) {
      return item.values().level === selectedLevel.toString();
    });
  }

  function showSurroundings() {
    mallSurroundings.forEach(function(el) {
      el.classList.remove('surroundings--hidden');
    });
  }

  function hideSurroundings() {
    mallSurroundings.forEach(function(el) {
      // classie.add(el, 'surroundings--hidden');
      el.classList.add('surroundings--hidden')
    });
  }

  function hideMallNav() {
    mallNav.classList.add('mallnav--hidden')
    viewFormEl.classList.add('view--hidden')
    viewPeriodEl.classList.add('view--hidden')
  }

  function showMallNav() {
    mallNav.classList.remove('mallnav--hidden');
    viewFormEl.classList.remove('view--hidden')
  }

}

wap.ac.ui.menu.MenuBuilding.prototype.buildingTabRender = function(initCheck) {
  var vThat = this

  var buildingOpenCount = goog.net.cookies.get("buildingOpenCount")
  if (isNaN(buildingOpenCount)) {
    buildingOpenCount = 0
  }

  if (initCheck == "init") {
  } else {
    buildingOpenCount++
    goog.net.cookies.set("buildingOpenCount", buildingOpenCount, -1, wap.fw.common.getContextPath() + "/");
  }

  if (buildingOpenCount % 2 !== 0) {
    vThat.buildingShow("show")
    // open
    goog.dom.setProperties(this.buildingBtnElement_, {
      class : 'sidebar-tab__menu--bt text-center fa fa-building-o'
    });

    goog.dom.classes.add(this.buildingBtnElement_, "sidebar-tab__menu--bt-clickOn");

  } else {
    vThat.buildingShow("hide")
    goog.dom.setProperties(this.buildingBtnElement_, {
      class : 'sidebar-tab__menu--bt text-center fa fa-building-o'
    });
    goog.dom.classes.remove(this.buildingBtnElement_, 'sidebar-tab__menu--bt-clickOn');

  }

}

wap.ac.ui.menu.MenuBuilding.prototype.buildingShow = function(vShowCheck) {

  var vMenuElementMenu = goog.dom.getElement("portal_menu")
  var vMenuElementBuilding = goog.dom.getElement("portal_building")
  if (vMenuElementMenu) {
    if (vShowCheck == "show") {
      // portalのmenuを隠す
      goog.dom.setProperties(vMenuElementMenu, {
        'style' : 'display:none'
      });
      // portalのbuildingを表示
      goog.dom.setProperties(vMenuElementBuilding, {
        'style' : 'display:'
      });

    } else {
      // portalのmenuを表示
      goog.dom.setProperties(vMenuElementMenu, {
        'style' : 'display:'
      });
      // portalのbuildingを隠す
      goog.dom.setProperties(vMenuElementBuilding, {
        'style' : 'display:none'
      });

    }
  }
}

wap.ac.ui.menu.MenuBuilding.prototype.setBuildingFrame = function(testTotalBuilding) {
  console.log("setBuildingFrame")

  var vMainBuildingFrame = goog.dom.getElement("portal_building")

  var vArea = goog.dom.createDom('div', {
    'class' : 'portal__building',
  });
  goog.dom.appendChild(vMainBuildingFrame, vArea);

  var vAsideLeft = goog.dom.createDom('aside', {
    'id' : 'spaces-list-left',
    'class' : 'spaces__list--left '
  });

  var vBuildingTitleText = testTotalBuilding.name + "ビル フロア図" + " 全" + testTotalBuilding.dataFloor + "階"

  var vBuildingTitle = goog.dom.createDom('aside', {
    'class' : 'building-title',
    'id' : 'building-title'
  }, vBuildingTitleText);

  goog.dom.appendChild(vAsideLeft, vBuildingTitle);

  // calendarを生成
  var vCalendarFrame = goog.dom.createDom('div', {
    'class' : 'view__calendar',
  });

  var section = null;

  section = new wap.ui.Section('');
  var input = new wap.ui.DateInput('基準月');

  input.render(vCalendarFrame);
  section.render(vCalendarFrame);

  goog.dom.appendChild(vAsideLeft, vCalendarFrame);

  input.setOnValueChanged(function() {
    // console.log('Entered value = ' + input.getValue());

    selectedViewName = "drawing"
    var src = "/company-cre-front/img/building/";
    if (selectedViewName == "simple") {
      imgTempName = "map_"
    } else if (selectedViewName == "floor") {
      imgTempName = "map_floor_"
    } else if (selectedViewName == "drawing") {
      imgTempName = "map_drawing_"
    }

    for (var i = 1; i <= testTotalBuilding.dataFloor; ++i) {
      var imgTemp = goog.dom.getElement("imgBuilding-" + i)
      goog.dom.setProperties(imgTemp, {
        src : src + imgTempName + i + ".gif"
      });
    }
  }, this);

  // MultiCheckを生成
  var vMultiCheckFrame = goog.dom.createDom('div', {
    'class' : 'view__multi',
  });
  goog.dom.appendChild(vAsideLeft, vMultiCheckFrame);
  gMc = new wap.ui.MultiCheck();
  gMc.addOption('シンプル', 'simple');
  gMc.addOption('フロアマップ', 'floor');
  gMc.addOption('図面', 'drawing');
  gMc.addOption('平面', 'field');
  gMc.render(vMultiCheckFrame);

  // navigation start結合
  var vNav = goog.dom.createDom('nav', {
    'class' : 'mallnav mallnav--hidden'
  });

  // up
  var vMalNavBtn = goog.dom.createDom('nav', {
    'class' : 'boxbutton mallnav__button--up fa fa-chevron-up',
    'aria-label' : 'Go up'
  });

  goog.dom.appendChild(vNav, vMalNavBtn);

  var vMalNavSvg = goog.dom.createDom('svg', {
    'class' : 'icon icon--angle-down',
  });

  goog.dom.appendChild(vMalNavBtn, vMalNavSvg);

  var vMalNavUse = goog.dom.createDom('use', {
    'xlink:href' : '#icon-angle-down',
  });

  vMalNavUse.setAttribute('xlink:href', '#icon-angle-down')
  goog.dom.appendChild(vMalNavSvg, vMalNavUse);

  // center
  vMalNavBtn = new goog.dom.createDom('nav', {
    'class' : 'boxbutton boxbutton--dark mallnav__button--all-levels fa fa-building-o',
    'aria-label' : 'Back to all levels'
  });

  goog.dom.appendChild(vNav, vMalNavBtn);

  vMalNavSvg = new goog.dom.createDom('svg', {
    'class' : 'icon icon--stack',
  });

  goog.dom.appendChild(vMalNavBtn, vMalNavSvg);

  vMalNavUse = new goog.dom.createDom('use', {
    'xlink:href' : '#icon-stack',
  });

  vMalNavUse.setAttribute('xlink:href', '#icon-angle-down')
  goog.dom.appendChild(vMalNavSvg, vMalNavUse);

  // down
  vMalNavBtn = new goog.dom.createDom('nav', {
    'class' : 'boxbutton mallnav__button--down fa fa-chevron-down',
    'aria-label' : 'Go down'
  });

  goog.dom.appendChild(vNav, vMalNavBtn);

  vMalNavSvg = new goog.dom.createDom('svg', {
    'class' : 'icon icon--angle-down',
  });

  goog.dom.appendChild(vMalNavBtn, vMalNavSvg);

  vMalNavUse = new goog.dom.createDom('use', {
    'xlink:href' : '#icon-angle-down',
  });

  vMalNavUse.setAttribute('xlink:href', '#icon-angle-down')
  goog.dom.appendChild(vMalNavSvg, vMalNavUse);

  // //////
  // navigation end結合

  vMapForm = new goog.dom.createDom('ul', {
    'class' : 'view__form view--hidden',
  });

  // 面積
  vLiFrame = new goog.dom.createDom('li', {
    'class' : 'selected',
  });
  goog.dom.appendChild(vMapForm, vLiFrame);

  vAFrameI = new goog.dom.createDom('a', {
    'class' : 'area',
  }, "面積（㎡）");
  goog.dom.appendChild(vLiFrame, vAFrameI);

  vMapI = new goog.dom.createDom('i', {
    'class' : 'fa fa-flag',
  });
  goog.dom.appendChild(vAFrameI, vMapI);

  goog.dom.appendChild(vMapForm, vLiFrame);

  // 売上
  vLiFrame = new goog.dom.createDom('li', {
    'class' : 'selected',
  });
  goog.dom.appendChild(vMapForm, vLiFrame);

  vAFrameI = new goog.dom.createDom('a', {
    'class' : 'money',
  }, "売上");
  goog.dom.appendChild(vLiFrame, vAFrameI);

  vMapI = new goog.dom.createDom('i', {
    'class' : 'fa fa-pie-chart',
  });
  goog.dom.appendChild(vAFrameI, vMapI);

  // 契約期間
  vLiFrame = new goog.dom.createDom('li', {
    'class' : 'selected',
  });
  goog.dom.appendChild(vMapForm, vLiFrame);

  vAFrameI = new goog.dom.createDom('a', {
    'class' : 'calendar',
  }, "契約期間");
  goog.dom.appendChild(vLiFrame, vAFrameI);

  vMapI = new goog.dom.createDom('i', {
    'class' : 'fa fa-calendar',
  });
  goog.dom.appendChild(vAFrameI, vMapI);

  // // 図面
  // vLiFrame = new goog.dom.createDom('li', {
  // 'class' : 'selected',
  // });
  // goog.dom.appendChild(vMapForm, vLiFrame);
  //
  // vAFrameI = new goog.dom.createDom('a', {
  // 'class' : 'drawing',
  // }, "図面");
  // goog.dom.appendChild(vLiFrame, vAFrameI);
  //
  // vMapI = new goog.dom.createDom('i', {
  // 'class' : 'fa fa-th',
  // });
  // goog.dom.appendChild(vAFrameI, vMapI);

  // icon end

  // 契約期間btn

  vPeriodBtnFrame = new goog.dom.createDom('div', {
    'class' : 'view__period view--hidden',
  });

  vPeriodBtn = new goog.dom.createDom('div', {
    'class' : 'btn',
  });
  goog.dom.appendChild(vPeriodBtnFrame, vPeriodBtn);

  vPeriodAllg = new goog.dom.createDom('span', {
    'class' : 'view__period--allg',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodAllg);
  vPeriodAlly = new goog.dom.createDom('span', {
    'class' : 'view__period--ally',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodAlly);
  vPeriodAllr = new goog.dom.createDom('span', {
    'class' : 'view__period--allr',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodAllr);

  vPeriodAllText = new goog.dom.createDom('span', {
    'class' : 'view__text',
  });

  goog.dom.appendChild(vPeriodBtn, vPeriodAllText);

  vPeriodBtn = new goog.dom.createDom('div', {
    'class' : 'btn',
  });
  goog.dom.appendChild(vPeriodBtnFrame, vPeriodBtn);

  vPeriodGreen = new goog.dom.createDom('span', {
    'class' : 'view__period--green',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodGreen);

  vPeriodGreenText = new goog.dom.createDom('span', {
    'class' : 'view__text',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodGreenText);

  vPeriodBtn = new goog.dom.createDom('div', {
    'class' : 'btn',
  });
  goog.dom.appendChild(vPeriodBtnFrame, vPeriodBtn);

  vPeriodYellow = new goog.dom.createDom('span', {
    'class' : 'view__period--yellow',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodYellow);

  vPeriodYellowText = new goog.dom.createDom('span', {
    'class' : 'view__text',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodYellowText);

  vPeriodBtn = new goog.dom.createDom('div', {
    'class' : 'btn',
  });

  vPeriodRed = new goog.dom.createDom('span', {
    'class' : 'view__period--red',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodRed);

  vPeriodRedText = new goog.dom.createDom('span', {
    'class' : 'view__text',
  });
  goog.dom.appendChild(vPeriodBtn, vPeriodRedText);

  goog.dom.appendChild(vPeriodBtnFrame, vPeriodBtn);

  goog.dom.appendChild(vAsideLeft, vNav);
  goog.dom.appendChild(vAsideLeft, vMapForm);
  goog.dom.appendChild(vAsideLeft, vPeriodBtnFrame);

  goog.dom.appendChild(vArea, vAsideLeft);

  var vAsideRight = goog.dom.createDom('aside', {
    'id' : 'spaces-list',
    'class' : 'spaces__list--right '
  });

  var vSearch = goog.dom.createDom('div', {
    'class' : 'search '
  });

  var vSearchInput = goog.dom.createDom('input', {
    'class' : 'search__input ',
    'placeholder' : 'Search... '
  });

  goog.dom.appendChild(vSearch, vSearchInput);
  goog.dom.appendChild(vAsideRight, vSearch);

  // label
  var vSortCategoryLabel = goog.dom.createDom('span', {
    'class' : 'label',
  });

  var vSortCategory = goog.dom.createDom('input', {
    'id' : 'sort-by-category',
    'class' : 'label__checkbox',
    'type' : 'checkbox',
    'aria-label' : 'Show alphabetically'
  });

  vSortText = goog.dom.createDom('label', {
    'class' : 'label__text',
  }, "Category");

  goog.dom.appendChild(vSortCategoryLabel, vSortCategory);
  goog.dom.appendChild(vSortCategoryLabel, vSortText);

  var vSortLabel = goog.dom.createDom('span', {
    'class' : 'label',
  });

  var vSortFloor = goog.dom.createDom('input', {
    'id' : 'sort-by-level',
    'class' : 'label__checkbox',
    'type' : 'checkbox',
    'aria-label' : 'Show alphabetically'
  });

  var vSortText = goog.dom.createDom('label', {
    'class' : 'label__text',
  }, "Level");

  goog.dom.appendChild(vSortLabel, vSortFloor);
  goog.dom.appendChild(vSortLabel, vSortText);

  var vSortNameLabel = goog.dom.createDom('span', {
    'class' : 'label',
  });

  var vSortName = goog.dom.createDom('input', {
    'id' : 'sort-by-name',
    'class' : 'label__checkbox',
    'type' : 'checkbox',
    'aria-label' : 'Show alphabetically'
  });

  vSortText = goog.dom.createDom('label', {
    'class' : 'label__text',
  }, "Name");

  goog.dom.appendChild(vSortNameLabel, vSortName);
  goog.dom.appendChild(vSortNameLabel, vSortText);

  var vLavelFrame = goog.dom.createDom('div', {
    'class' : 'label--frame',
  });

  // frameに結合
  goog.dom.appendChild(vLavelFrame, vSortCategoryLabel);
  goog.dom.appendChild(vLavelFrame, vSortLabel);
  goog.dom.appendChild(vLavelFrame, vSortNameLabel);
  goog.dom.appendChild(vAsideRight, vLavelFrame);
  //
  goog.dom.appendChild(vArea, vAsideRight);

  var setTestTotalBuildingMax = 5
  var setTestTotalBuildingMaxHeightAdd = 100
  var setTestTotalBuildingMaxHeight = 1000
  var plusHeight = 0
  var checkSize = null

  buildingFrame = goog.dom.getElement("spaces-list-left")

  if (testTotalBuilding.dataFloor >= 6) {
    if (testTotalBuilding.dataFloor >= 15) {
      setTestTotalBuildingMaxHeightAdd = 90
    }
    checkSize = testTotalBuilding.dataFloor - setTestTotalBuildingMax
    for (var i = 0; i < checkSize; ++i) {
      plusHeight += setTestTotalBuildingMaxHeightAdd
    }
    buildingFrame.style.minHeight = setTestTotalBuildingMaxHeight + plusHeight + "px" + ""
  }

}

wap.ac.ui.menu.MenuBuilding.prototype.setFloorBuilding = function(setTestTotalBuilding) {
  var vParent = goog.dom.getElement("spaces-list-left")

  var vLevels = goog.dom.createDom('div', {
    'class' : 'levels levels__transform',
    'id' : '3d-level',
  });

  var vSurroundings = goog.dom.createDom('div', {
    'class' : 'surroundings',
    'id' : 'surroundings',
  });

  var vSurroundingsMap = goog.dom.createDom('img', {
    'class' : 'surroundings__map',
    'src' : "/company-cre-front/img/building/surroundings.svg"
  });

  goog.dom.appendChild(vSurroundings, vSurroundingsMap);

  // var vItemImg = goog.dom.createDom('img', 'img--building')
  var src = "/company-cre-front/img/building/";
  var vTempCount = 0
  for (var i = 1; i <= setTestTotalBuilding; ++i) {
    var vLevel = goog.dom.createDom('div', {
      'class' : 'level level--' + i + ' level--bg',
      // 'aria-label' : 'Level 1',
      'id' : 'Level-' + i,
    });

    var vItemImg = goog.dom.createDom('img', {
      'class' : 'img--building',
      'id' : "imgBuilding-" + i
    });

    if (i % 17 == 0) {
      vTempCount = 0
    }
    vTempCount++
    // if (i < 18) {

    // if (i == setTestTotalBuilding) {
    // // svg webコード反映テスト
    // this.testAddSvg(vLevel)
    //
    // } else {
    goog.dom.setProperties(goog.dom.getElement(vItemImg), {
      src : src + "map_" + vTempCount + ".gif"
    });
    // }

    // } else {

    // if (vTempCount < 18) {
    // vTempCount++
    // } else {
    // vTempCount--
    // }
    //
    // goog.dom.setProperties(goog.dom.getElement(vItemImg), {
    // src : src + "map_" + i - vTempCount + ".gif"
    // });
    // }

    var vLevelTag = goog.dom.createDom('span', {
      'class' : 'level--tag',
    }, "L" + i);

    goog.dom.appendChild(vLevel, vLevelTag);
    // if (i != setTestTotalBuilding) {
    goog.dom.appendChild(vLevel, vItemImg);
    // }
    goog.dom.appendChild(vLevels, vLevel);

    this.setPinFrame(i, vLevel)

  }

  goog.dom.appendChild(vParent, vSurroundings);
  goog.dom.appendChild(vParent, vLevels);

}

wap.ac.ui.menu.MenuBuilding.prototype.init = function() {
  this.arTenantList = []
}

wap.ac.ui.menu.MenuBuilding.prototype.setListCategory = function(testTotalBuilding) {
  console.log("spaces-list-left")

  var vParent = goog.dom.getElement("spaces-list")

  var vUl = goog.dom.createDom('ul', {
    'class' : 'list'
  });

  goog.dom.classes.add(vUl, "grouped-by-category");

  for (var i = 1; i < testTotalBuilding.length; ++i) {
    this.setTestData(testTotalBuilding[i][0], testTotalBuilding[i][1], testTotalBuilding[i][2],
        testTotalBuilding[i][3], testTotalBuilding[i][4], testTotalBuilding[i][5], testTotalBuilding[i][6],
        testTotalBuilding[i][7], testTotalBuilding[i][8])
  }

  // this.setTestData("さわみつ青果", "1", "1", "1.08", "361", "441", "09:00AM — 17:00PM", "(03) XXX-XXX",
  // "JCB DC UC VISA アメックス VIEW ダイナース 他")
  // this.setTestData("魚河岸大和", "1", "1", "1.01", "158", "161", "09:30AM — 19:00PM", "(01) 555-111",
  // "※クール商品は別途216円お客様負担となります。 税抜き200円 60センチ以内 それを超える場合税抜き￥300")
  // this.setTestData("Crazy Banana", "1", "1", "1.02")
  // this.setTestData("富澤商店", "2", "1", "2.05", "798", "386")
  // this.setTestData("Smoothies & Soul", "1", "1", "1.09")
  // this.setTestData("Seed of Life", "1", "1", "1.06")
  // this.setTestData("Raw Delight", "1", "1", "1.07")
  // this.setTestData("Grilled Chipotle", "2", "1", "2.01")
  // this.setTestData("ウニコ", "3", "1", "3.01", "216", "388")
  // this.setTestData("Cold Soup Kitchen", "4", "1", "4.01")
  // this.setTestData("Superfood", "2", "1", "2.06")
  //
  // // category2
  // this.setTestData("ナノユニバース", "4", '2', "4.06", "43", "221", "10:00AM — 09:00PM", "(03) 123-3456",
  // "電話注文による、着払い発送を承ります。ご自宅・指定先にお届けいたします。※配達はヤマト運輸、代引き支払い。代引き手数料と送料は実費がかかります。")
  // this.setTestData("Permaculture Hub", "4", '2', "4.07")
  // this.setTestData("Folding Life", "1", '2', "1.03")
  // this.setTestData("Rocketship Tech", "2", '2', "2.02")
  // this.setTestData("Which Bug", "2", '2', "2.03")
  // this.setTestData("Enlightend Path", "3", '2', "3.02")
  // this.setTestData("ビームス", "4", '2', "4.02", "693", "431", "09:30AM — 19:00PM", "(01) 555-111",
  // "駐車場情報はこちらから http://www.lumine.ne.jp/shinjuku/info/map.html")
  //
  // // category3
  // this.setTestData("Little Artist", "4", '3', "4.03")
  //
  // // category4
  // this.setTestData("Star Gazer", "3", '4', "3.07")
  // this.setTestData("Space 16", "4", '4', "4.04")

  vArTenantList = this.arTenantList

  this.createTenant(vUl)

  goog.dom.appendChild(vParent, vUl);

}

wap.ac.ui.menu.MenuBuilding.prototype.createTenant = function(vParent) {

  for (var i = 0; i < this.arTenantList.length; ++i) {
    var vListItem = goog.dom.createDom('li', {
      'class' : "list__item",
      'data-name' : this.arTenantList[i].dataName,
      'data-level' : this.arTenantList[i].dataLevel,
      'data-category' : this.arTenantList[i].dataCategory,
      'data-space' : this.arTenantList[i].dataSpace,
    });

    var vAhref = goog.dom.createDom('span', {
      'href' : '#',
      'class' : 'list__link',
    }, this.arTenantList[i].dataName);

    goog.dom.appendChild(vListItem, vAhref);
    goog.dom.appendChild(vParent, vListItem);

  }

}

wap.ac.ui.menu.MenuBuilding.prototype.setTestData = function(dataName, dataLevel, dataCategory, dataSpace, pinX, pinY,
    dataClock, dataPhone, dataDesc) {

  this.objTenant = []

  this.objTenant.dataName = dataName
  this.objTenant.dataLevel = dataLevel
  this.objTenant.dataCategory = dataCategory
  this.objTenant.dataSpace = dataSpace
  // /
  this.objTenant.pinX = pinX
  this.objTenant.pinY = pinY
  this.objTenant.dataClock = dataClock
  this.objTenant.dataPhone = dataPhone
  this.objTenant.dataDesc = dataDesc

  this.arTenantList.push(this.objTenant)

}

wap.ac.ui.menu.MenuBuilding.prototype.setPinFrame = function(currentLevel, currentLevelElement) {

  for (var i = 0; i < this.arTenantList.length; ++i) {
    if (currentLevel == this.arTenantList[i].dataLevel) {
      if (this.arTenantList[i].pinX != null) {
        var vPin = goog.dom.createDom('span', {
          'class' : 'level__pins--title fa fa-thumb-tack',
          'id' : this.arTenantList[i].dataSpace,
        });
        // vPin
        goog.dom.appendChild(currentLevelElement, vPin);
        goog.style.setStyle(vPin, {
          'left' : this.arTenantList[i].pinX + "px",
          'top' : this.arTenantList[i].pinY + "px",
          'display' : "none"
        });

      }
    }
  }
}
